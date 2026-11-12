import { useMemo } from 'react'
import { estiloSlots, navAll, testimonialItems } from '../content.js'
import Nav, { FloatingWhatsApp } from '../components/Nav.jsx'
import Hero from '../sections/Hero.jsx'
import HowItWorks from '../sections/HowItWorks.jsx'
import Services from '../sections/Services.jsx'
import Estilos from '../sections/Estilos.jsx'
import Tagline from '../sections/Tagline.jsx'
import Gallery, { galleryContent } from '../sections/Gallery.jsx'
import CoatGuide from '../sections/CoatGuide.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import Location from '../sections/Location.jsx'
import Faq from '../sections/Faq.jsx'
import FinalCta from '../sections/FinalCta.jsx'
import Footer from '../sections/Footer.jsx'

const components = {
  hero: Hero,
  how: HowItWorks,
  services: Services,
  estilos: Estilos,
  tagline: Tagline,
  gallery: Gallery,
  coats: CoatGuide,
  testimonials: Testimonials,
  where: Location,
  faq: Faq,
  cta: FinalCta,
}

export default function Home() {
  // Una sección de fotos o de testimonios solo existe si tiene contenido real.
  const g = galleryContent()
  const showGallery = g.bento.length + g.pairs.length > 0
  const showEstilos = estiloSlots().length > 0
  const showTestimonials = testimonialItems().length > 0

  const navItems = useMemo(
    () => navAll.filter((n) => (n.id !== 'galeria' || showGallery) && (n.id !== 'estilos' || showEstilos)),
    [showGallery, showEstilos],
  )

  // Orden y color de fondo. Cada sección pinta una onda con el color de la anterior.
  // Los fondos con texto blanco usan turquoise-deep (contraste 5 a 1).
  const flow = [
    ['hero', 'turquoise-deep'],
    ['how', 'cream'],
    ['services', 'orange'],
    showEstilos && ['estilos', 'cream'],
    ['tagline', 'turquoise-deep'],
    showGallery && ['gallery', 'cream'],
    ['coats', 'orange-soft'],
    showTestimonials && ['testimonials', 'cream'],
    ['where', 'turquoise-soft'],
    ['faq', 'cream'],
    ['cta', 'turquoise-deep'],
  ].filter(Boolean)

  return (
    <>
      <a
        href="#contenido"
        className="title-4 fixed top-2 left-2 z-60 -translate-y-24 rounded-full bg-ink px-3 py-2 text-cream transition-transform duration-300 ease-base focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <Nav items={navItems} />
      <main id="contenido">
        {flow.map(([key], i) => {
          const Section = components[key]
          return <Section key={key} prev={i > 0 ? flow[i - 1][1] : undefined} wave={i} />
        })}
      </main>
      <Footer prev={flow[flow.length - 1][1]} wave={flow.length} />
      <FloatingWhatsApp />
    </>
  )
}
