import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App, { routeKey } from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
)

// En producción el HTML viene prerenderizado con su ruta en data-route. Se hidrata solo si
// coincide con la URL; si un host sirve otro HTML (por ejemplo el del inicio), se renderiza de cero.
const sameRoute = root.dataset.route === routeKey(window.location.pathname)
if (root.firstElementChild && sameRoute) hydrateRoot(root, app)
else createRoot(root).render(app)
