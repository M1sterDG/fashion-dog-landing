import { ImageSquare } from '@phosphor-icons/react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { cn, useRevealOnce } from '../lib/hooks.js'
import { has, payments, placeholdersOn, whatsappUrl } from '../content.js'
import { Icon } from './icons.jsx'
import { Wave } from './decor.jsx'
import { url } from '../lib/url.js'

/* ---------- Placeholders de contenido ({{precio}}, {{shampoos}}...) ---------- */
export function Ph({ children }) {
  return (
    <mark className="box-decoration-clone rounded-sm border border-dashed border-ink/40 bg-cream px-1 font-medium text-ink">
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

/* ---------- Foto: solo se dibuja si está en availableImages.
   Con ?placeholders=1 muestra un marcador para desarrollar. ---------- */
export function Img({ file, alt, className, priority = false, hint }) {
  if (!has(file)) {
    if (!placeholdersOn()) return null
    return (
      <div className={cn('overflow-hidden', className)}>
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-ink/25 bg-cream p-4 text-center text-ink"
        >
          <ImageSquare size={32} weight="duotone" aria-hidden="true" />
          <span className="body-5 break-all">{file}</span>
          <span className="caption-5 text-ink/70">{hint ?? 'Falta esta foto'}</span>
        </div>
      </div>
    )
  }
  return (
    <div className={cn('overflow-hidden', className)}>
      <img
        src={url(`img/${file}`)}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className="h-full w-full object-cover"
      />
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

export function WhatsAppButton({
  place,
  id,
  className,
  size = 'lg',
  href = whatsappUrl,
  children = 'Reservar por WhatsApp',
}) {
  return (
    <Button
      id={id}
      href={href}
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

/* ---------- Logo: siempre /img/logo.png ---------- */
export function Logo({ className = 'h-10' }) {
  return (
    <img
      src={url('img/logo.png')}
      alt="Peluquería Canina Fashion Dog"
      width="286"
      height="169"
      className={cn('w-auto', className)}
    />
  )
}

/* ---------- Secciones ---------- */
const bgClass = {
  cream: 'bg-cream text-ink',
  orange: 'bg-orange text-ink',
  turquoise: 'bg-turquoise text-white',
  'orange-soft': 'bg-orange-soft text-ink',
  'turquoise-soft': 'bg-turquoise-soft text-ink',
}

// bg: color de la sección. prev: color de la sección anterior, para pintar la onda.
export function Section({ id, bg = 'cream', prev, wave = 0, className, children }) {
  return (
    <section id={id} className={cn('relative pt-20 pb-16 md:pb-20', bgClass[bg], className)}>
      {prev && <Wave color={prev} variant={wave} />}
      <div className="relative mx-auto w-full max-w-6xl px-4">{children}</div>
    </section>
  )
}

export function SectionHeader({ eyebrow, title, intro, className, muted = 'text-ink/70' }) {
  return (
    <Reveal className={cn('max-w-[680px]', className)}>
      <p className="caption-3 mb-3 inline-flex rounded-full bg-ink px-3 py-1 uppercase tracking-wide text-cream">
        {eyebrow}
      </p>
      <h2 className="heading-3 md:heading-2">{title}</h2>
      {intro && <p className={cn('body-3 mt-3', muted)}>{intro}</p>}
    </Reveal>
  )
}

/* ---------- Medios de pago ---------- */
export function PaymentMethods({ className, center = false }) {
  return (
    <div className={cn('flex flex-col gap-2', center && 'items-center', className)}>
      <p className="caption-3 uppercase tracking-wide opacity-80">{payments.label}</p>
      <ul className={cn('flex flex-wrap gap-2', center && 'justify-center')}>
        {payments.items.map((p) => (
          <li
            key={p.label}
            className="body-5 flex items-center gap-2 rounded-full border border-ink/15 bg-cream px-3 py-1 text-ink"
          >
            <Icon name={p.icon} size={20} weight="duotone" />
            {p.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
