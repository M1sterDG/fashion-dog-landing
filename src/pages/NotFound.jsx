import { PawPrint } from '@phosphor-icons/react'
import { Button, Logo } from '../components/ui.jsx'
import { url } from '../lib/url.js'

export default function NotFound() {
  return (
    <main id="contenido" className="flex min-h-svh flex-col items-center justify-center gap-6 bg-turquoise-soft px-4 py-16 text-center">
      <a href={url()} aria-label="Ir al inicio" className="rounded-full">
        <Logo className="h-32" />
      </a>
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-orange" aria-hidden="true">
        <PawPrint size={32} weight="fill" />
      </span>
      <div className="max-w-[680px]">
        <p className="caption-3 uppercase tracking-wide text-ink/70">Error 404</p>
        <h1 className="heading-4 md:heading-3 mt-2">No encontramos esta página</h1>
        <p className="body-3 mt-3 text-ink/70">
          El enlace puede estar mal escrito o la página ya no existe. Vuelve al inicio para ver los servicios y reservar por WhatsApp.
        </p>
      </div>
      <Button href={url()} className="w-full sm:w-auto">
        Volver al inicio
      </Button>
    </main>
  )
}
