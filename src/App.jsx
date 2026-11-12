import Home from './pages/Home.jsx'
import Legal, { legalPages } from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'
import { BASE } from './lib/url.js'

export function normalizePath(p) {
  // En GitHub Pages el sitio vive bajo /nombre-del-repo/: se quita ese prefijo antes de enrutar.
  const base = BASE.replace(/\/$/, '')
  let path = p || '/'
  if (base && (path === base || path.startsWith(base + '/'))) path = path.slice(base.length) || '/'
  const clean = path.replace(/index\.html$/, '').replace(/\/+$/, '')
  return clean === '' ? '/' : clean
}

// Ruta canónica de una URL: '/', '/privacidad', '/terminos' o '/404'.
export function routeKey(path) {
  const p = normalizePath(path)
  return p === '/' || legalPages[p] ? p : '/404'
}

export default function App({ path }) {
  const key = routeKey(path)
  if (key === '/') return <Home />
  if (key === '/404') return <NotFound />
  return <Legal path={key} />
}
