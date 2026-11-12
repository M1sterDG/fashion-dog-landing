import { MapPin, PawPrint } from '@phosphor-icons/react'
import { altText, hero } from '../content.js'
import { Img, Reveal, WhatsAppButton } from '../components/ui.jsx'

export default function Hero() {
  return (
    <section id="inicio" className="bg-cream pt-24 pb-16 md:pb-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="caption-3 mb-3 inline-flex rounded-full bg-turquoise px-3 py-1 uppercase tracking-wide">
              {hero.eyebrow}
            </p>
            <h1 className="heading-3 lg:heading-2 max-w-[680px] bg-linear-to-r from-black to-[#666666] bg-clip-text text-transparent">
              {hero.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="title-2 mt-4 max-w-[680px] text-ink/80">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-6">
            <WhatsAppButton id="hero-cta" place="hero" className="w-full sm:w-auto" />
            <p className="caption-2 mt-3 text-ink/70">{hero.ctaNote}</p>
            <p className="body-5 mt-4 flex items-start gap-2">
              <MapPin size={20} weight="fill" className="mt-0.5 shrink-0 text-turquoise-strong" aria-hidden="true" />
              <span>{hero.proof}</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="absolute -right-4 -bottom-4 h-full w-full rounded-4xl bg-turquoise" aria-hidden="true" />
          <Img
            file="hero.jpg"
            alt={altText.hero}
            priority
            tone="orange"
            hint="Foto principal del hero, mínimo 1600 px de ancho"
            className="relative aspect-4/5 rounded-4xl"
          />
          <div
            className="absolute top-4 left-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange text-ink"
            aria-hidden="true"
          >
            <PawPrint size={32} weight="fill" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
