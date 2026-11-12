import { services } from '../content.js'
import { Icon } from '../components/icons.jsx'
import { Reveal, Section, SectionHeader, T } from '../components/ui.jsx'

export default function Services() {
  const { pricing } = services
  return (
    <Section id="servicios" bg="bg-cream">
      <SectionHeader eyebrow={services.eyebrow} title={services.title} intro={services.intro} />

      {/* Los dos servicios */}
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {services.items.map((s, i) => {
          const turq = i % 2 === 0
          return (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 80}
              className={`rounded-2xl border border-ink/10 p-6 ${turq ? 'bg-turquoise-soft' : 'bg-orange-soft'}`}
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${turq ? 'bg-turquoise' : 'bg-orange'}`}>
                <Icon name={s.icon} size={28} weight="duotone" />
              </span>
              <h3 className="heading-5 mt-4">{s.title}</h3>
              <p className="body-3 mt-2 text-ink/70">{s.text}</p>
            </Reveal>
          )
        })}
      </ul>

      {/* Precio por tamaño */}
      <Reveal className="mt-4 rounded-3xl border border-ink/10 bg-cream p-6 md:p-8">
        <h3 className="heading-5">{pricing.title}</h3>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {pricing.tiers.map((t, i) => {
            const known = !t.price.startsWith('{{')
            return (
              <li
                key={t.size}
                className={`flex flex-col rounded-2xl border border-ink/10 p-6 ${known ? 'bg-orange' : 'bg-turquoise-soft'}`}
              >
                <p className="title-1">{t.size}</p>
                <p className="caption-2 mt-1 min-h-5">{t.note}</p>
                <p className="heading-4 mt-4">
                  <T>{t.price}</T>
                </p>
                {t.includes && (
                  <p className="body-5 mt-2">
                    Incluye: <T>{t.includes}</T>
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      </Reveal>

      {/* Notas: shampoos y baño medicado */}
      <ul className="mt-4 grid gap-4 md:grid-cols-2">
        {services.notes.map((n, i) => (
          <Reveal
            as="li"
            key={n.title}
            delay={i * 80}
            className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-cream p-6"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-turquoise">
              <Icon name={n.icon} size={28} weight="duotone" />
            </span>
            <div className="min-w-0">
              <h3 className="title-1">{n.title}</h3>
              <p className="body-3 mt-1 text-ink/70">
                <T>{n.text}</T>
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
