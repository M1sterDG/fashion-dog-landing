// BASE_URL termina siempre en "/". Es "/" en el dominio propio y "/nombre-del-repo/" en GitHub Pages.
export const BASE = import.meta.env.BASE_URL

// Ruta interna del sitio (páginas y archivos de public/), con el prefijo de base.
export const url = (p = '') => BASE + String(p).replace(/^\//, '')
