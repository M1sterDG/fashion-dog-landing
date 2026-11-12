import { useEffect, useMemo, useState } from 'react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { nav, whatsappUrl } from '../content.js'
import { cn, useActiveSection, useAnyInView } from '../lib/hooks.js'
import { Logo, WhatsAppButton, trackWhatsApp } from './ui.jsx'

const ids = nav.map((n) => n.id)

export default function Nav() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      {/* Panel móvil de alto completo */}
      <div
        id="menu-movil"
        inert={!open}
        aria-hidden={!open}
        className={cn(
          'fixed inset-0 z-40 bg-cream/95 backdrop-blur-2xl transition-opacity duration-500 ease-base lg:hidden',
          open ? 'menu-open opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <ul className="mx-auto flex h-full max-w-6xl flex-col justify-center gap-4 px-4 pt-24 pb-16">
          {nav.map((n, i) => (
            <li key={n.id} className="menu-item" style={{ '--i': i }}>
              <a
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === n.id ? 'location' : undefined}
                className={cn(
                  'heading-5 block rounded-2xl px-3 py-2 transition-colors duration-300 ease-base',
                  active === n.id ? 'bg-turquoise-soft' : 'hover:bg-turquoise-soft',
                )}
              >
                {n.label}
              </a>
            </li>
          ))}
          <li className="menu-item mt-4" style={{ '--i': nav.length }}>
            <WhatsAppButton place="menu" className="w-full" />
          </li>
        </ul>
      </div>

      {/* Barra flotante */}
      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label="Principal"
          className="pointer-events-auto flex items-center gap-6 rounded-full border border-ink/10 bg-cream/70 py-2 pr-2 pl-3 backdrop-blur-md"
        >
          <a href="#inicio" aria-label="Ir al inicio" className="flex items-center rounded-full">
            <Logo className="h-12" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? 'location' : undefined}
                  className={cn(
                    'title-4 block rounded-full px-3 py-2 transition-colors duration-300 ease-base',
                    active === n.id ? 'bg-turquoise' : 'hover:bg-turquoise-soft',
                  )}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-turquoise-soft transition-colors duration-300 ease-base hover:bg-turquoise lg:hidden"
          >
            <span
              className={cn(
                'absolute h-0.5 w-5 rounded-full bg-ink transition-transform duration-500 ease-base',
                open ? 'rotate-45' : '-translate-y-1',
              )}
            />
            <span
              className={cn(
                'absolute h-0.5 w-5 rounded-full bg-ink transition-transform duration-500 ease-base',
                open ? '-rotate-45' : 'translate-y-1',
              )}
            />
          </button>
        </nav>
      </header>
    </>
  )
}

// Botón flotante de WhatsApp (solo móvil). Aparece cuando el CTA del hero sale de la pantalla.
export function FloatingWhatsApp() {
  const ctaIds = useMemo(() => ['hero-cta', 'cta-final'], [])
  const ctaInView = useAnyInView(ctaIds)
  const visible = !ctaInView
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsApp('flotante')}
      inert={!visible}
      aria-label="Reservar por WhatsApp"
      className={cn(
        'fixed right-4 bottom-4 z-30 flex min-h-12 items-center gap-2 rounded-full bg-orange px-3 py-2 button-md text-ink shadow-lg transition-[transform,opacity,background-color] duration-500 ease-base hover:bg-orange-strong active:scale-98 md:hidden motion-reduce:transform-none',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
      )}
    >
      <WhatsappLogo size={24} weight="fill" aria-hidden="true" />
      Reservar
    </a>
  )
}
