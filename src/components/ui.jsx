import { useEffect, useRef, useState } from 'react'
import { ImageSquare, PawPrint, WhatsappLogo } from '@phosphor-icons/react'
import { cn, useRevealOnce } from '../lib/hooks.js'
import { payments, whatsappUrl } from '../content.js'
import { Icon } from './icons.jsx'

/* ---------- Placeholders de contenido ({{precio}}, {{horario}}...) ---------- */
export function Ph({ children }) {
  return (
    <mark className="box-decoration-clone rounded-sm border border-dashed border-ink/40 bg-orange/30 px-1 font-medium text-ink">
      {children}
    </mark>
  )
}

// Convierte {{placeholder}} dentro de un texto en un marcador visible.
export function T({ children }) {
  const parts = String(children).split(/(\{\{[^}]+\}\})/g)
  return parts.map((p, i) => (p.startsWith('{{') ? <Ph key={i}>{p}</Ph> : p))
}

/* ---------- Revelado al hacer scroll ---------- */
export function Reveal({ as: Tag = 'div', delay = 0, className, children, ...rest }) {
  const [ref, visible] = useRevealOnce()
  return (
    <Tag
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={delay ? { '--d': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ---------- Imagen con marcador elegante si falta el archivo ---------- */
const tones = {
  turquoise: 'bg-turquoise-soft',
  orange: 'bg-orange-soft',
  cream: 'bg-cream',
}

export function Img({ file, alt, className, tone = 'turquoise', priority = false, hint }) {
  const [failed, setFailed] = useState(false)
  const ref = useRef(null)

  // Si la imagen falló antes de que React hidratara, el evento onError ya pasó.
  useEffect(() => {
    const el = ref.current
    if (el && el.complete && el.naturalWidth === 0) setFailed(true)
  }, [])

  return (
    <div className={cn('overflow-hidden', className)}>
      {failed ? (
        <div
          role="img"
          aria-label={alt}
          className={cn(
            'flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-ink/25 p-4 text-center',
            tones[tone],
          )}
        >
          <ImageSquare size={32} weight="duotone" aria-hidden="true" />
          <span className="body-5 break-all text-ink">{file}</span>
          <span className="caption-5 text-ink/70">{hint ?? 'Falta esta foto en public/img'}</span>
        </div>
      ) : (
        <img
          ref={ref}
          src={`/img/${file}`}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  )
}

/* ---------- Botón principal ---------- */
const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-3 py-2 transition-[transform,background-color] duration-300 ease-base hover:-translate-y-0.5 active:translate-y-px active:scale-98 motion-reduce:transform-none'

const variants = {
  primary: 'bg-orange text-ink hover:bg-orange-strong',
  secondary: 'border border-ink/20 bg-cream text-ink hover:bg-turquoise-soft',
}

export function Button({ href, variant = 'primary', size = 'md', className, children, ...rest }) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], size === 'lg' ? 'button-lg' : 'button-md', className)}
      {...rest}
    >
      {children}
    </a>
  )
}

// Conversión: clic en el botón de WhatsApp.
export function trackWhatsApp(place) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'whatsapp_click', place })
}

export function WhatsAppButton({ place, id, className, size = 'lg', children = 'Reservar por WhatsApp' }) {
  return (
    <Button
      id={id}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      size={size}
      className={className}
      onClick={() => trackWhatsApp(place)}
    >
      <WhatsappLogo size={24} weight="fill" aria-hidden="true" />
      {children}
    </Button>
  )
}

/* ---------- Logo: logo.svg, luego logo.png, luego marca de texto ---------- */
export function Logo({ className = 'h-10' }) {
  const [step, setStep] = useState(0)
  const ref = useRef(null)
  const sources = ['/img/logo.svg', '/img/logo.png']

  useEffect(() => {
    const el = ref.current
    if (el && el.complete && el.naturalWidth === 0) setStep((s) => s + 1)
  }, [step])

  if (step >= sources.length) {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-turquoise text-orange">
          <PawPrint size={24} weight="fill" aria-hidden="true" />
        </span>
        <span className="body-1 whitespace-nowrap">Fashion Dog</span>
        <span className="sr-only">Peluquería Canina Fashion Dog</span>
      </span>
    )
  }
  return (
    <img
      key={step}
      ref={ref}
      src={sources[step]}
      alt="Peluquería Canina Fashion Dog"
      className={cn('w-auto', className)}
      onError={() => setStep((s) => s + 1)}
    />
  )
}

/* ---------- Encabezado de sección ---------- */
export function SectionHeader({ eyebrow, title, intro, className }) {
  return (
    <Reveal className={cn('max-w-[680px]', className)}>
      <p className="caption-3 mb-3 inline-flex rounded-full bg-ink px-3 py-1 uppercase tracking-wide text-cream">
        {eyebrow}
      </p>
      <h2 className="heading-4 md:heading-3">{title}</h2>
      {intro && <p className="body-3 mt-3 text-ink/70">{intro}</p>}
    </Reveal>
  )
}

export function Section({ id, bg = 'bg-cream', className, children }) {
  return (
    <section id={id} className={cn('py-16 md:py-24', bg, className)}>
      <div className="mx-auto w-full max-w-6xl px-4">{children}</div>
    </section>
  )
}

/* ---------- Medios de pago ---------- */
export function PaymentMethods({ className, center = false }) {
  return (
    <div className={cn('flex flex-col gap-2', center && 'items-center', className)}>
      <p className="caption-3 uppercase tracking-wide text-ink/70">{payments.label}</p>
      <ul className={cn('flex flex-wrap gap-2', center && 'justify-center')}>
        {payments.items.map((p) => (
          <li
            key={p.label}
            className="body-5 flex items-center gap-2 rounded-full border border-ink/15 bg-cream px-3 py-1"
          >
            <Icon name={p.icon} size={20} weight="duotone" />
            {p.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
