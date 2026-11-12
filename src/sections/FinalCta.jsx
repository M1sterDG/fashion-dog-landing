import { finalCta } from '../content.js'
import { PaymentMethods, Reveal, WhatsAppButton } from '../components/ui.jsx'

export default function FinalCta() {
  return (
    <section id="reservar" className="bg-cream py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4">
        <Reveal className="rounded-4xl border border-ink/10 bg-turquoise p-8 text-center md:p-16">
          <h2 className="heading-4 md:heading-3 mx-auto max-w-[680px]">{finalCta.title}</h2>
          <p className="body-3 mx-auto mt-3 max-w-[680px]">{finalCta.text}</p>
          <WhatsAppButton id="cta-final" place="final" className="mt-6 w-full sm:w-auto" />
          <PaymentMethods center className="mt-6" />
        </Reveal>
      </div>
    </section>
  )
}
