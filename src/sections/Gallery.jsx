import { useEffect, useState } from 'react'
import { ArrowsLeftRight } from '@phosphor-icons/react'
import { altText, gallery } from '../content.js'
import { Img, Reveal, Section, SectionHeader } from '../components/ui.jsx'
import { cn } from '../lib/hooks.js'

const bento = [
  'col-span-2 row-span-2', // 1: grande
  '',
  '',
  '',
  '',
  'col-span-2', // 6: ancho (puede ser el video)
  '',
  '',
]

// video-1.mp4 es opcional. vite.config.js detecta si existe el archivo al iniciar.
const hasVideo = typeof __HAS_VIDEO__ !== 'undefined' && __HAS_VIDEO__

function BentoVideo() {
  const [playable, setPlayable] = useState(false)
  useEffect(() => {
    // Con movimiento reducido no se reproduce solo: se muestra la foto.
    setPlayable(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  if (!playable) return null
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      src="/img/video-1.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Video corto de perros en la peluquería Fashion Dog"
    />
  )
}

function BeforeAfter({ n }) {
  const [after, setAfter] = useState(false)
  return (
    <button
      type="button"
      aria-pressed={after}
      onClick={() => setAfter((v) => !v)}
      aria-label={`Caso ${n}: mostrar ${after ? 'antes' : 'después'}`}
      className="group relative block aspect-4/5 w-full overflow-hidden rounded-2xl border border-ink/10 text-left"
    >
      <Img
        file={`antes-${n}.jpg`}
        alt={altText.antes(n)}
        tone="orange"
        hint="Foto del perro antes"
        className={cn('absolute inset-0 transition-opacity duration-500 ease-base', after ? 'opacity-0' : 'opacity-100')}
      />
      <Img
        file={`despues-${n}.jpg`}
        alt={altText.despues(n)}
        tone="turquoise"
        hint="Foto del perro después"
        className={cn('absolute inset-0 transition-opacity duration-500 ease-base', after ? 'opacity-100' : 'opacity-0')}
      />
      {/* Etiqueta: 16px de radio menos 12px de margen da 4px (rounded-sm) */}
      <span className="caption-3 absolute bottom-3 left-3 flex items-center gap-1 rounded-sm bg-cream px-2 py-1 uppercase tracking-wide">
        <ArrowsLeftRight size={16} weight="bold" aria-hidden="true" />
        {after ? gallery.after : gallery.before}
      </span>
    </button>
  )
}

export default function Gallery() {
  return (
    <Section id="galeria" bg="bg-turquoise-soft">
      <SectionHeader eyebrow={gallery.eyebrow} title={gallery.title} />

      {/* Bento */}
      <Reveal className="mt-10 grid auto-rows-[10rem] grid-cols-2 gap-3 md:auto-rows-[14rem] md:grid-cols-4">
        {bento.map((span, i) => {
          const n = i + 1
          const isVideoSlot = n === 6 && hasVideo
          return (
            <div key={n} className={cn('relative overflow-hidden rounded-2xl', span)}>
              <Img
                file={`galeria-${n}.jpg`}
                alt={altText.galeria(n)}
                tone={i % 3 === 0 ? 'orange' : 'cream'}
                hint="Perro ya arreglado"
                className="h-full w-full"
              />
              {isVideoSlot && <BentoVideo />}
            </div>
          )
        })}
      </Reveal>

      {/* Antes y después */}
      <Reveal className="mt-16 max-w-[680px]">
        <h3 className="heading-5">{gallery.beforeAfterTitle}</h3>
        <p className="body-3 mt-2 text-ink/70">{gallery.beforeAfterHint}</p>
      </Reveal>
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
        {[1, 2, 3, 4, 5, 6].map((n, i) => (
          <Reveal key={n} delay={(i % 3) * 80}>
            <BeforeAfter n={n} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
