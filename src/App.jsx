import Home from './pages/Home.jsx'
import Legal, { legalPages } from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

export function normalizePath(p) {
  const clean = (p || '/').replace(/index\.html$/, '').replace(/\/+$/, '')
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
