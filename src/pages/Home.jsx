import Nav, { FloatingWhatsApp } from '../components/Nav.jsx'
import Hero from '../sections/Hero.jsx'
import Commitments from '../sections/Commitments.jsx'
import Services from '../sections/Services.jsx'
import Tagline from '../sections/Tagline.jsx'
import HowItWorks from '../sections/HowItWorks.jsx'
import Gallery from '../sections/Gallery.jsx'
import CoatGuide from '../sections/CoatGuide.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import Location from '../sections/Location.jsx'
import Faq from '../sections/Faq.jsx'
import FinalCta from '../sections/FinalCta.jsx'
import Footer from '../sections/Footer.jsx'

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="title-4 fixed top-2 left-2 z-60 -translate-y-24 rounded-full bg-ink px-3 py-2 text-cream transition-transform duration-300 ease-base focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <Nav />
      <main id="contenido">
        <Hero />
        <Commitments />
        <Services />
        <Tagline />
        <HowItWorks />
        <Gallery />
        <CoatGuide />
        <Testimonials />
        <Location />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
