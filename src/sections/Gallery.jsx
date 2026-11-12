import { useEffect, useState } from 'react'
import { ArrowsLeftRight } from '@phosphor-icons/react'
import { LIMITS, altText, gallery, has, pairSlots, photoSlots } from '../content.js'
import { Img, Reveal, Section, SectionHeader } from '../components/ui.jsx'
import { cn } from '../lib/hooks.js'
import { url } from '../lib/url.js'

// Cómo se reparte el bento según cuántas fotos haya (1 a 5). Siempre queda un rectángulo completo.
const layouts = {
  1: ['col-span-2 row-span-2 md:col-span-4'],
  2: ['row-span-2 md:col-span-2', 'row-span-2 md:col-span-2'],
  3: ['col-span-2 row-span-2', 'md:col-span-2', 'md:col-span-2'],
  4: ['col-span-2 row-span-2', '', '', 'col-span-2'],
  5: ['col-span-2 row-span-2', '', '', '', ''],
}

// video-1.mp4 es opcional: si está en availableImages, reemplaza a la segunda foto.
function BentoVideo() {
  const [playable, setPlayable] = useState(false)
  useEffect(() => {
    // Con movimiento reducido no se reproduce solo: se queda la foto.
    setPlayable(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  if (!playable) return null
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      src={url('img/video-1.mp4')}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Video corto de perros en la peluquería Fashion Dog"
    />
  )
}

// ia: las fotos generadas con IA empiezan con "ia-" y llevan la etiqueta "Ejemplo referencial".
// Las reales van sin etiqueta.
function BeforeAfter({ n, ia }) {
  const [after, setAfter] = useState(false)
  const prefix = ia ? 'ia-' : ''
  return (
    <button
      type="button"
      aria-pressed={after}
      onClick={() => setAfter((v) => !v)}
      aria-label={`Caso ${n}: mostrar ${after ? 'antes' : 'después'}`}
      className="relative block aspect-4/3 w-full overflow-hidden rounded-2xl bg-cream text-left sm:aspect-4/5"
    >
      <Img
        file={`${prefix}antes-${n}.jpg`}
        alt={altText.antes(n)}
        hint="Foto del perro antes"
        className={cn('absolute inset-0 transition-opacity duration-500 ease-base', after ? 'opacity-0' : 'opacity-100')}
      />
      <Img
        file={`${prefix}despues-${n}.jpg`}
        alt={altText.despues(n)}
        hint="Foto del perro después"
        className={cn('absolute inset-0 transition-opacity duration-500 ease-base', after ? 'opacity-100' : 'opacity-0')}
      />
      {/* Etiquetas: 16px de radio menos 12px de margen da 4px (rounded-sm) */}
      {ia && (
        <span className="caption-3 absolute top-3 left-3 rounded-sm bg-ink px-2 py-1 uppercase tracking-wide text-cream">
          {gallery.iaTag}
        </span>
      )}
      <span className="caption-3 absolute bottom-3 left-3 flex items-center gap-1 rounded-sm bg-cream px-2 py-1 uppercase tracking-wide text-ink">
        <ArrowsLeftRight size={16} weight="bold" aria-hidden="true" />
        {after ? gallery.after : gallery.before}
      </span>
    </button>
  )
}

// Fotos que se van a mostrar. Si ambas listas están vacías, Home no dibuja la sección.
export function galleryContent() {
  return { bento: photoSlots('galeria', LIMITS.bento), pairs: pairSlots(LIMITS.beforeAfter) }
}

export default function Gallery({ prev, wave }) {
  const { bento, pairs } = galleryContent()
  const layout = layouts[bento.length] ?? []
  const videoSlot = has('video-1.mp4') ? 1 : -1

  return (
    <Section id="galeria" bg="cream" prev={prev} wave={wave}>
      <SectionHeader eyebrow={gallery.eyebrow} title={gallery.title} />

      {bento.length > 0 && (
        <Reveal className="mt-10 grid auto-rows-[10rem] grid-cols-2 gap-3 md:auto-rows-[14rem] md:grid-cols-4">
          {bento.map((n, i) => (
            <div key={n} className={cn('relative overflow-hidden rounded-2xl bg-orange-soft', layout[i])}>
              <Img file={`galeria-${n}.jpg`} alt={altText.galeria(n)} hint="Perro ya arreglado" className="h-full w-full" />
              {i === videoSlot && <BentoVideo />}
            </div>
          ))}
        </Reveal>
      )}

      {pairs.length > 0 && (
        <>
          <Reveal className="mt-16 max-w-[680px]">
            <h3 className="heading-5">{gallery.beforeAfterTitle}</h3>
            <p className="body-3 mt-2 text-ink/70">{gallery.beforeAfterHint}</p>
          </Reveal>
          <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:gap-4">
            {pairs.map(({ n, ia }, i) => (
              <Reveal key={`${ia ? 'ia' : 'real'}-${n}`} delay={i * 80}>
                <BeforeAfter n={n} ia={ia} />
              </Reveal>
            ))}
          </div>
        </>
      )}
    </Section>
  )
}
