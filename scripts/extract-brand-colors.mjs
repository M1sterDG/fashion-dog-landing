// Extrae el turquesa y el naranja exactos del logo y escribe:
//   src/styles/brand-colors.css  (tokens de color)
//   public/favicon.svg           (favicon con los mismos colores)
//
// Uso:  npm run brand:colors
//       node scripts/extract-brand-colors.mjs [ruta/al/logo.png] [--out carpeta]
//
// Lee public/img/logo-original.png (sin procesar) o, si no existe, logo.svg, logo.png, logo-redondo.png.
// Importante: no mide un logo con fondo convertido a transparente, porque eso altera los colores.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const args = process.argv.slice(2)
const outIdx = args.indexOf('--out')
const outDir = outIdx >= 0 ? path.resolve(args[outIdx + 1]) : root
const explicit = args.find((a, i) => !a.startsWith('--') && i !== outIdx + 1)

const candidates = explicit
  ? [path.resolve(explicit)]
  : ['logo-original.png', 'logo.svg', 'logo.png', 'logo-redondo.png'].map((f) => path.join(root, 'public/img', f))
const logoPath = candidates.find((p) => fs.existsSync(p))
if (!logoPath) {
  console.error('No encontré el logo. Pon public/img/logo.png (o logo.svg) y vuelve a correr el script.')
  process.exit(1)
}

const { data, info } = await sharp(logoPath, { density: 300 })
    .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min
  let h = 0, s = 0
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1))
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  return { h, s, l }
}

// Rangos de tono: turquesa 160 a 200 grados, naranja dorado 20 a 55 grados.
const families = {
  turquoise: { min: 160, max: 200, buckets: new Map() },
  orange: { min: 20, max: 55, buckets: new Map() },
}

for (let i = 0; i < data.length; i += info.channels) {
  const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]]
  if (a < 250) continue // ignora transparencias y bordes suavizados
  const { h, s, l } = rgbToHsl(r, g, b)
  if (s < 0.3 || l < 0.3 || l > 0.8) continue // ignora grises, sombras y brillos
  for (const fam of Object.values(families)) {
    if (h >= fam.min && h <= fam.max) {
      // Agrupa colores casi iguales (el ruido de JPEG impide repetir el valor exacto).
      const key = `${r >> 3},${g >> 3},${b >> 3}`
      const e = fam.buckets.get(key) ?? { n: 0, rs: [], gs: [], bs: [] }
      e.n++; e.rs.push(r); e.gs.push(g); e.bs.push(b)
      fam.buckets.set(key, e)
    }
  }
}

function dominant(name) {
  const entries = [...families[name].buckets.values()]
  if (!entries.length) return null
  const top = entries.sort((x, y) => y.n - x.n)[0]
  // Mediana por canal dentro del grupo más frecuente: no mezcla ni promedia tonos distintos.
  const med = (a) => a.sort((p, q) => p - q)[a.length >> 1]
  return [med(top.rs), med(top.gs), med(top.bs)]
}

const turquoise = dominant('turquoise')
const orange = dominant('orange')
if (!turquoise || !orange) {
  console.error(`No pude detectar ${!turquoise ? 'el turquesa' : 'el naranja'} en ${logoPath}.`)
  process.exit(1)
}

const hex = ([r, g, b]) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase()
const mix = (c, withC, t) => c.map((v, i) => Math.round(v * (1 - t) + withC[i] * t))
const white = [255, 255, 255]
const black = [0, 0, 0]
const lum = ([r, g, b]) => {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}
const contrast = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return ((x + 0.05) / (y + 0.05)).toFixed(2)
}
const ink = [28, 25, 23]

const css = `/* Generado por scripts/extract-brand-colors.mjs a partir de ${path.basename(logoPath)}.
   No editar a mano: corre "npm run brand:colors". */
:root {
  --brand-turquoise: ${hex(turquoise)};
  --brand-turquoise-strong: ${hex(mix(turquoise, black, 0.12))};
  --brand-turquoise-soft: ${hex(mix(turquoise, white, 0.85))};
  --brand-orange: ${hex(orange)};
  --brand-orange-strong: ${hex(mix(orange, black, 0.12))};
  --brand-orange-soft: ${hex(mix(orange, white, 0.86))};
}
`
fs.mkdirSync(path.join(outDir, 'src/styles'), { recursive: true })
fs.mkdirSync(path.join(outDir, 'public'), { recursive: true })
fs.writeFileSync(path.join(outDir, 'src/styles/brand-colors.css'), css)

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Fashion Dog">
  <rect width="64" height="64" rx="16" fill="${hex(turquoise)}"/>
  <g fill="${hex(orange)}">
    <ellipse cx="32" cy="41" rx="12" ry="10"/>
    <ellipse cx="16" cy="29" rx="5" ry="6.5"/>
    <ellipse cx="26" cy="19" rx="5" ry="6.5"/>
    <ellipse cx="38" cy="19" rx="5" ry="6.5"/>
    <ellipse cx="48" cy="29" rx="5" ry="6.5"/>
  </g>
</svg>
`
fs.writeFileSync(path.join(outDir, 'public/favicon.svg'), favicon)

console.log(`Logo: ${logoPath}`)
console.log(`Turquesa: ${hex(turquoise)}  (contraste con texto oscuro ${contrast(turquoise, ink)}:1)`)
console.log(`Naranja:  ${hex(orange)}  (contraste con texto oscuro ${contrast(orange, ink)}:1)`)
console.log(`Escrito en ${outDir}`)
