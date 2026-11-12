import { cn } from '../lib/hooks.js'

/* Decoración en SVG plano: sin gradientes, un solo color por forma. */

export function Paw({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="32" cy="43" rx="14" ry="11" />
      <ellipse cx="13" cy="29" rx="6" ry="8" transform="rotate(-18 13 29)" />
      <ellipse cx="25" cy="16" rx="6" ry="8" transform="rotate(-6 25 16)" />
      <ellipse cx="39" cy="16" rx="6" ry="8" transform="rotate(6 39 16)" />
      <ellipse cx="51" cy="29" rx="6" ry="8" transform="rotate(18 51 29)" />
    </svg>
  )
}

// Mancha orgánica
export function Blob({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="currentColor" aria-hidden="true" preserveAspectRatio="none">
      <path d="M150.5 27.6C172.8 45.9 188 78.2 183.6 108C179.2 137.8 155.2 165 125.4 177.5C95.6 190 59.8 187.8 38.3 168.7C16.8 149.6 9.7 113.8 17.9 84.1C26.1 54.4 49.6 30.9 77.4 21.5C105.2 12.1 128.2 9.3 150.5 27.6Z" />
    </svg>
  )
}

// Rastro de huellas, para el lema y el CTA final
export function PawTrail({ className, primary = 'text-turquoise-strong', accent = 'text-orange' }) {
  return (
    <div className={cn('pointer-events-none', className)} aria-hidden="true">
      <Paw className={cn('absolute top-0 left-12 h-24 w-24 rotate-12', primary)} />
      <Paw className={cn('absolute top-28 left-0 h-20 w-20 -rotate-12', accent)} />
      <Paw className={cn('absolute top-48 left-20 h-28 w-28 rotate-6', primary)} />
    </div>
  )
}

/* Ondas entre secciones.
   Cada sección pinta en su borde superior el color de la sección anterior. */
const waveColor = {
  cream: 'text-cream',
  orange: 'text-orange',
  turquoise: 'text-turquoise',
  'turquoise-deep': 'text-turquoise-deep',
  'orange-soft': 'text-orange-soft',
  'turquoise-soft': 'text-turquoise-soft',
}

const wavePaths = [
  'M0 0H1440V22C1320 52 1200 58 1080 40C960 22 840 2 720 12C600 22 480 58 360 58C240 58 120 40 0 18Z',
  'M0 0H1440V40C1300 8 1160 4 1020 26C880 48 760 60 620 46C480 32 360 6 220 14C140 18 60 34 0 44Z',
  'M0 0H1440V30C1380 52 1300 62 1200 52C1100 42 1020 12 900 12C780 12 700 50 580 54C460 58 360 24 240 20C140 17 60 30 0 46Z',
]

export function Wave({ color, variant = 0 }) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-x-0 top-0 h-8 md:h-12', waveColor[color])}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="block h-full w-full" fill="currentColor">
        <path d={wavePaths[variant % wavePaths.length]} />
      </svg>
    </div>
  )
}
