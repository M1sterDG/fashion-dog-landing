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

export default defineConfig({
  // Subruta del sitio. "/" en el dominio propio; "/nombre-del-repo/" en GitHub Pages.
  base: process.env.SITE_BASE || '/',
  plugins: [react(), tailwindcss(), seoHead()],
})
