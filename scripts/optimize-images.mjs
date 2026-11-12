// Normaliza y optimiza las fotos de public/img/:
//   - nombre en minúsculas y sin espacios ("estilo higienico.jpg" pasa a "estilo-higienico.jpg")
//   - todo a JPG de calidad 80, sin metadatos (respeta antes la orientación EXIF)
//   - máximo 1600 px de ancho en el hero (hero.jpg, ia-hero.jpg) y 1200 px en el resto
//   - borra el PNG original después de convertirlo
// No toca los logos (logo*.png) porque necesitan fondo transparente.
//
// Uso:  npm run images
//       node scripts/optimize-images.mjs --backup ruta/de/respaldo
//
// Es idempotente: scripts/images-processed.json guarda la huella de cada foto ya procesada,
// así que correrlo de nuevo solo toca fotos nuevas o cambiadas y no recomprime las demás.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const dir = path.join(root, 'public/img')
const manifestPath = path.join(import.meta.dirname, 'images-processed.json')
const bIdx = process.argv.indexOf('--backup')
const backupDir = bIdx >= 0 ? path.resolve(process.argv[bIdx + 1]) : null

const QUALITY = 80
const HERO_MAX = 1600
const OTHER_MAX = 1200

const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {}
const sha = (file) => crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// OneDrive puede bloquear un archivo unos segundos mientras lo sincroniza (EPERM, UNKNOWN, EBUSY).
// Se escribe a un temporal nuevo y se reemplaza el destino con reintentos.
async function writeSafely(dest, buffer) {
  const tmp = `${dest}.tmp`
  fs.writeFileSync(tmp, buffer)
  let lastError
  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      if (fs.existsSync(dest)) fs.rmSync(dest)
      fs.renameSync(tmp, dest)
      return
    } catch (e) {
      lastError = e
      await sleep(500 * (attempt + 1))
    }
  }
  fs.rmSync(tmp, { force: true })
  throw lastError
}

const kb = (n) => (n / 1024).toFixed(0).padStart(6) + ' KB'

const isLogo = (f) => /^logo/i.test(f)
const isImage = (f) => /\.(png|jpe?g|webp)$/i.test(f)
const isHero = (name) => /^(ia-)?hero$/.test(name)

if (backupDir) fs.mkdirSync(backupDir, { recursive: true })

let before = 0
let after = 0
let touched = 0
const rows = []

for (const original of fs.readdirSync(dir).sort()) {
  if (!isImage(original) || isLogo(original)) continue
  const src = path.join(dir, original)
  const base = path.parse(original).name.toLowerCase().trim().replace(/\s+/g, '-')
  const outName = `${base}.jpg`
  const out = path.join(dir, outName)
  const sizeBefore = fs.statSync(src).size

  // Ya procesada y sin cambios: no se vuelve a comprimir.
  if (original === outName && manifest[outName] === sha(src)) {
    rows.push([original, '(ya optimizada)', sizeBefore, sizeBefore])
    before += sizeBefore
    after += sizeBefore
    continue
  }

  if (backupDir) fs.copyFileSync(src, path.join(backupDir, original))

  const maxWidth = isHero(base) ? HERO_MAX : OTHER_MAX
  const buffer = await sharp(src)
    .rotate() // aplica la orientación EXIF antes de quitar los metadatos
    .resize({ width: maxWidth, withoutEnlargement: true })
    .flatten({ background: '#ffffff' }) // un PNG con transparencia pasa a fondo blanco
    .jpeg({ quality: QUALITY, mozjpeg: true }) // sharp no copia metadatos si no se piden
    .toBuffer()

  await writeSafely(out, buffer)
  if (original !== outName) fs.rmSync(src, { force: true }) // borra el original (PNG o nombre antiguo)
  manifest[outName] = sha(out)
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n') // se guarda foto por foto
  const meta = await sharp(buffer).metadata()
  rows.push([original === outName ? original : `${original} -> ${outName}`, `${meta.width}x${meta.height}`, sizeBefore, buffer.length])
  before += sizeBefore
  after += buffer.length
  touched++
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')

for (const [name, dims, b, a] of rows) {
  console.log(`${name.padEnd(46)} ${dims.padEnd(10)} ${kb(b)} -> ${kb(a)}`)
}
console.log('')
console.log(`Procesadas: ${touched} de ${rows.length}`)
console.log(`Peso total antes:   ${(before / 1048576).toFixed(2)} MB`)
console.log(`Peso total después: ${(after / 1048576).toFixed(2)} MB`)
if (before) console.log(`Ahorro: ${(100 - (after / before) * 100).toFixed(0)}%`)
