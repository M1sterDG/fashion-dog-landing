import { altText, has, hero, placeholdersOn } from '../content.js'
import { Icon } from '../components/icons.jsx'
import { Blob, Paw } from '../components/decor.jsx'
import { Img, Logo, Reveal, WhatsAppButton } from '../components/ui.jsx'
import { cn } from '../lib/hooks.js'

const chipTilt = ['-rotate-2', 'rotate-1', '-rotate-1']

function HeroVisual() {
  const photo = has('hero.jpg') || placeholdersOn()

  if (!photo) {
    // Sin foto: composición del logo con formas planas, nunca una caja vacía.
    return (
      <div className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-md">
        <div className="absolute top-0 right-4 h-24 w-24 rounded-full bg-orange md:h-32 md:w-32" aria-hidden="true" />
        <Blob className="absolute inset-0 h-full w-full text-cream" />
        <Paw className="absolute bottom-6 left-4 h-14 w-14 -rotate-12 text-orange md:h-20 md:w-20" />
        <Paw className="absolute top-10 left-6 h-10 w-10 rotate-12 text-turquoise md:h-14 md:w-14" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Logo className="h-32 md:h-40" />
        </div>
      </div>
    )
  }

  // Con foto: arco con borde naranja y el logo sobre una mancha crema en la esquina.
  return (
    <div className="relative mx-auto w-full max-w-sm pb-6 lg:max-w-md">
      <Img
        file="hero.jpg"
        alt={altText.hero}
        priority
        hint="Foto principal, mínimo 1600 px de ancho"
        className="aspect-4/5 rounded-t-full border-8 border-orange bg-cream"
      />
      <div className="absolute bottom-0 left-0 flex h-36 w-44 items-center justify-center">
        <Blob className="absolute inset-0 h-full w-full text-cream" />
        <Logo className="relative h-16" />
      </div>
      <div className="absolute top-8 right-0 h-16 w-16 rounded-full bg-orange" aria-hidden="true" />
    </div>
  )
}

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-turquoise pt-24 pb-16 text-white md:pb-20">
      {/* Huellas decorativas de fondo */}
      <Paw className="pointer-events-none absolute top-24 right-4 h-20 w-20 rotate-12 text-turquoise-strong md:right-12 md:h-28 md:w-28" />
      <Paw className="pointer-events-none absolute bottom-4 left-4 h-24 w-24 -rotate-12 text-turquoise-strong" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="caption-3 mb-3 inline-flex rounded-full bg-ink px-3 py-1 uppercase tracking-wide text-cream">
              {hero.eyebrow}
            </p>
            <h1 className="heading-3 md:heading-2 xl:heading-1 max-w-[680px]">
              {hero.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="title-2 mt-4 max-w-[680px]">{hero.subtitle}</p>
          </Reveal>

          <Reveal delay={120} className="mt-6">
            <WhatsAppButton id="hero-cta" place="hero" className="w-full sm:w-auto" />
            <p className="caption-2 mt-3">{hero.ctaNote}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {hero.chips.map((c, i) => (
                <li
                  key={c.text}
                  className={cn(
                    'body-5 flex items-center gap-2 rounded-full border border-ink/10 bg-cream px-3 py-2 text-ink shadow-md',
                    chipTilt[i],
                  )}
                >
                  <Icon name={c.icon} size={20} weight="duotone" />
                  {c.text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  )
}
