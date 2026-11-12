import { Clock, MapPin, Phone, WhatsappLogo } from '@phosphor-icons/react'
import { altText, business, mapsEmbed, mapsLink, where, whatsappUrl } from '../content.js'
import { Button, Img, Reveal, Section, SectionHeader, T, trackWhatsApp } from '../components/ui.jsx'

function Row({ icon: IconC, label, children }) {
  return (
    <div className="flex gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-turquoise">
        <IconC size={24} weight="duotone" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="caption-3 uppercase tracking-wide text-ink/70">{label}</p>
        <div className="body-2 mt-1 wrap-anywhere">{children}</div>
      </div>
    </div>
  )
}

export default function Location() {
  return (
    <Section id="donde-estamos" bg="bg-cream">
      <SectionHeader eyebrow={where.eyebrow} title={where.title} />

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <Reveal className="flex min-w-0 flex-col gap-6 rounded-3xl border border-ink/10 bg-turquoise-soft p-6 md:p-8">
          <Row icon={MapPin} label={where.addressLabel}>
            {business.addressLine}
          </Row>

          <Row icon={MapPin} label={where.zonesLabel}>
            <ul className="flex flex-wrap gap-2">
              {business.zones.map((z) => (
                <li key={z} className="body-5 rounded-full border border-ink/15 bg-cream px-3 py-1">
                  {z}
                </li>
              ))}
            </ul>
          </Row>

          <Row icon={Clock} label={where.hoursLabel}>
            <T>{business.hours}</T>
          </Row>

          <Row icon={Phone} label={where.contactLabel}>
            <a href={`tel:${business.phoneIntl}`} className="underline underline-offset-4">
              {business.phoneDisplay}
            </a>
            <br />
            <a href={`mailto:${business.email}`} className="body-5 underline underline-offset-4">
              {business.email}
            </a>
          </Row>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={mapsLink} target="_blank" rel="noopener noreferrer" variant="secondary" className="w-full sm:w-auto">
              <MapPin size={24} weight="fill" aria-hidden="true" />
              {where.mapCta}
            </Button>
            <Button
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => trackWhatsApp('donde')}
            >
              <WhatsappLogo size={24} weight="fill" aria-hidden="true" />
              Escríbenos
            </Button>
          </div>
        </Reveal>

        <Reveal delay={100} className="min-h-80 overflow-hidden rounded-3xl border border-ink/10 bg-orange-soft">
          <iframe
            title={where.mapTitle}
            src={mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-80 w-full"
          />
        </Reveal>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 md:gap-4">
        {altText.local.map((alt, i) => (
          <Reveal key={i} delay={i * 80}>
            <Img
              file={`local-${i + 1}.jpg`}
              alt={alt}
              tone={i === 1 ? 'orange' : 'turquoise'}
              hint={['Fachada', 'Recepción', 'Zona de baño'][i]}
              className="aspect-square rounded-2xl"
            />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
