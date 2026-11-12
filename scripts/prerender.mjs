// Genera el HTML estático de cada ruta a partir del build del cliente y del build SSR.
// Resultado: dist/index.html, dist/privacidad/index.html, dist/terminos/index.html y dist/404.html
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { headTags } from '../src/seo.js'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const ssrDir = path.join(root, 'dist-ssr')
const entry = fs.readdirSync(ssrDir).find((f) => f.startsWith('entry-server') && f.endsWith('.js'))
const { render } = await import(pathToFileURL(path.join(ssrDir, entry)).href)

const routes = [
  { route: '/', file: 'index.html', schema: true },
  { route: '/privacidad', file: 'privacidad/index.html', schema: false },
  { route: '/terminos', file: 'terminos/index.html', schema: false },
  { route: '/404', file: '404.html', schema: false },
]

for (const r of routes) {
  let html = template.replace('<div id="root"><!--app--></div>', `<div id="root" data-route="${r.route}">${render(r.route)}</div>`)
  html = html.replace(/<!--head-start-->[\s\S]*?<!--head-end-->/, `<!--head-start-->\n    ${headTags(r.route)}\n    <!--head-end-->`)
  if (!r.schema) html = html.replace(/<!--schema-start-->[\s\S]*?<!--schema-end-->/, '')
  const out = path.join(dist, r.file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
  console.log('prerender', r.route, '->', path.relative(root, out))
}

fs.rmSync(ssrDir, { recursive: true, force: true })
