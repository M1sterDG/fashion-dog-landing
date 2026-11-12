import { finalCta } from '../content.js'
import { Paw, Wave } from '../components/decor.jsx'
import { PaymentMethods, Reveal, WhatsAppButton } from '../components/ui.jsx'

// CTA final: mismo botón que el hero, sobre turquesa a sangre.
export default function FinalCta({ prev, wave }) {
  return (
    <section id="reservar" className="relative overflow-hidden bg-turquoise pt-20 pb-16 text-center text-white md:pb-20">
      {prev && <Wave color={prev} variant={wave} />}
      <Paw className="pointer-events-none absolute top-24 left-4 h-20 w-20 -rotate-12 text-turquoise-strong md:left-16 md:h-28 md:w-28" />
      <Paw className="pointer-events-none absolute right-4 bottom-8 h-24 w-24 rotate-12 text-orange md:right-16" />
      <Reveal className="relative mx-auto w-full max-w-6xl px-4">
        <h2 className="heading-3 md:heading-2 mx-auto max-w-[680px]">{finalCta.title}</h2>
        <p className="title-2 mx-auto mt-3 max-w-[680px]">{finalCta.text}</p>
        <WhatsAppButton id="cta-final" place="final" className="mt-6 w-full sm:w-auto" />
        <PaymentMethods center className="mt-6" />
      </Reveal>
    </section>
  )
}
