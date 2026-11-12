import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { headTags, schemaTags } from './src/seo.js'

// Pone en el HTML estático el <head> (title, meta, og) y el schema (LocalBusiness y FAQPage),
// entre marcadores que scripts/prerender.mjs reemplaza para las otras rutas.
function seoHead() {
  return {
    name: 'seo-head',
    transformIndexHtml(html) {
      return html
        .replace('<!--head-->', `<!--head-start-->\n    ${headTags('/')}\n    <!--head-end-->`)
        .replace('<!--schema-->', `<!--schema-start-->\n    ${schemaTags()}\n    <!--schema-end-->`)
    },
  }
}

// video-1.mp4 es opcional: si existe al iniciar, la galería lo muestra.
const hasVideo = fs.existsSync(path.resolve(import.meta.dirname, 'public/img/video-1.mp4'))

export default defineConfig({
  plugins: [react(), tailwindcss(), seoHead()],
  define: { __HAS_VIDEO__: JSON.stringify(hasVideo) },
})
