# Fashion Dog, landing page

Vite, React y Tailwind 4. Una sola acción: reservar por WhatsApp.

    npm install
    npm run dev          desarrollo
    npm run build        build más HTML prerenderizado en dist/ (/, /privacidad, /terminos, 404.html)
    npm run brand:colors lee public/img/logo.png|svg y escribe el turquesa y el naranja exactos

## Para publicar
1. Pon tus fotos en `public/img/` (nombres en `public/img/LEEME.txt`).
2. Corre `npm run brand:colors` con el logo ya puesto.
3. Reemplaza los `{{placeholders}}` en `src/content.js` (se ven resaltados en la página).
4. El host debe servir `/privacidad/index.html`, `/terminos/index.html` y `404.html`.
