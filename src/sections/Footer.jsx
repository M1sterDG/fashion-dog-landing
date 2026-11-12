import { EnvelopeSimple, FacebookLogo, MapPin, Phone } from '@phosphor-icons/react'
import { business, footer } from '../content.js'
import { Wave } from '../components/decor.jsx'
import { Logo, PaymentMethods } from '../components/ui.jsx'
import { url } from '../lib/url.js'

export default function Footer({ current, prev, wave }) {
  const link = 'inline-flex min-h-10 items-center gap-2 rounded-sm underline-offset-4 hover:underline'
  return (
    <footer className="relative bg-orange-soft pt-20 pb-12 text-ink">
      {prev && <Wave color={prev} variant={wave} />}
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 md:grid-cols-4">
        <div>
          <Logo className="h-24" />
          <p className="body-3 mt-4 max-w-xs text-ink/70">{footer.blurb}</p>
          <PaymentMethods className="mt-6" />
        </div>

        <div>
          <h2 className="title-3">Contacto</h2>
          <ul className="body-5 mt-3 flex flex-col gap-1">
            <li>
              <a className={link} href={`tel:${business.phoneIntl}`}>
                <Phone size={20} aria-hidden="true" />
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a className={`${link} wrap-anywhere`} href={`mailto:${business.email}`}>
                <EnvelopeSimple size={20} className="shrink-0" aria-hidden="true" />
                {business.email}
              </a>
            </li>
            <li className="flex items-start gap-2 py-2">
              <MapPin size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
              {business.addressLine}
            </li>
            <li>
              <a className={link} href={business.facebook} target="_blank" rel="noopener noreferrer">
                <FacebookLogo size={20} aria-hidden="true" />
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="title-3">Horario</h2>
          <ul className="body-5 mt-3 flex flex-col gap-2">
            {business.hours.map((h) => (
              <li key={h.days}>
                <span className="body-4 block">{h.days}</span>
                {h.time}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="title-3">Legal</h2>
          <ul className="body-5 mt-3 flex flex-col gap-1">
            <li>
              <a className={link} href={url('privacidad')} aria-current={current === 'privacidad' ? 'page' : undefined}>
                {footer.privacy}
              </a>
            </li>
            <li>
              <a className={link} href={url('terminos')} aria-current={current === 'terminos' ? 'page' : undefined}>
                {footer.terms}
              </a>
            </li>
            <li>
              <a className={link} href={`${url()}#inicio`}>
                Volver al inicio
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="caption-2 relative mx-auto mt-10 w-full max-w-6xl px-4 text-ink/70">{footer.rights}</p>
    </footer>
  )
}
