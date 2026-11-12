import { buildWhatsappUrl, services } from '../content.js'
import { Icon } from '../components/icons.jsx'
import { Reveal, Section, SectionHeader, T, WhatsAppButton } from '../components/ui.jsx'

export default function Services({ prev, wave }) {
  return (
    <Section id="servicios" bg="orange" prev={prev} wave={wave}>
      <SectionHeader eyebrow={services.eyebrow} title={services.title} intro={services.intro} muted="text-ink/80" />

      {/* Los dos servicios: icono grande y botón que abre WhatsApp con el servicio escrito */}
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {services.items.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 80} className="flex flex-col rounded-3xl bg-cream p-6">
            <span className={`flex h-16 w-16 items-center justify-center rounded-2xl ${i === 0 ? 'bg-turquoise' : 'bg-orange'}`}>
              <Icon name={s.icon} size={40} weight="duotone" />
            </span>
            <h3 className="heading-4 mt-4">{s.title}</h3>
            <p className="body-3 mt-2 flex-1 text-ink/70">{s.text}</p>
            <WhatsAppButton
              place={`servicio ${s.whatsappService}`}
              href={buildWhatsappUrl(s.whatsappService)}
              size="md"
              className="mt-4 w-full sm:w-auto sm:self-start"
            >
              {services.reserve}
            </WhatsAppButton>
          </Reveal>
        ))}
      </ul>

      {/* Precio según el tamaño */}
      <ul className="mt-4 grid gap-4 md:grid-cols-3">
        {services.tiers.map((t, i) => {
          const known = !t.price.startsWith('{{')
          return (
            <Reveal
              as="li"
              key={t.size}
              delay={i * 80}
              className={`flex flex-col rounded-3xl p-6 ${known ? 'bg-turquoise' : 'bg-cream'}`}
            >
              <p className="title-1">{t.size}</p>
              <p className="caption-2 mt-1 min-h-5">{t.note}</p>
              <p className="heading-3 md:heading-2 mt-4">
                <T>{t.price}</T>
              </p>
              {t.includes && (
                <p className="body-5 mt-2">
                  Incluye: <T>{t.includes}</T>
                </p>
              )}
            </Reveal>
          )
        })}
      </ul>

      {/* Shampoos y baño medicado */}
      <ul className="mt-4 grid gap-2 md:grid-cols-2 md:gap-4">
        {services.notes.map((n) => (
          <Reveal
            as="li"
            key={n.text}
            className="flex items-center gap-3 rounded-2xl bg-cream/70 p-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-turquoise">
              <Icon name={n.icon} size={24} weight="duotone" />
            </span>
            <p className="body-5">
              <T>{n.text}</T>
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
