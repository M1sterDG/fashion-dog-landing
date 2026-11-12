import { coats } from '../content.js'
import { Icon } from '../components/icons.jsx'
import { Reveal, Section, SectionHeader } from '../components/ui.jsx'

export default function CoatGuide() {
  return (
    <Section id="tipo-de-pelo" bg="bg-cream">
      <SectionHeader eyebrow={coats.eyebrow} title={coats.title} intro={coats.intro} />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {coats.items.map((c, i) => {
          const turq = i % 2 === 0
          return (
            <Reveal
              as="li"
              key={c.name}
              delay={(i % 4) * 80}
              className={`flex flex-col rounded-2xl border border-ink/10 p-6 ${turq ? 'bg-turquoise-soft' : 'bg-orange-soft'}`}
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${turq ? 'bg-turquoise' : 'bg-orange'}`}>
                <Icon name={c.icon} size={28} weight="duotone" />
              </span>
              <h3 className="title-1 mt-4">{c.name}</h3>
              <p className="caption-2 mt-1 text-ink/70">{c.examples}</p>

              <dl className="mt-4 flex flex-1 flex-col gap-3">
                <div>
                  <dt className="caption-3 uppercase tracking-wide text-ink/70">{coats.bathLabel}</dt>
                  <dd className="body-4 mt-1">{c.bath}</dd>
                </div>
                <div>
                  <dt className="caption-3 uppercase tracking-wide text-ink/70">{coats.careLabel}</dt>
                  <dd className="body-6 mt-1">{c.care}</dd>
                </div>
                <div>
                  <dt className="caption-3 uppercase tracking-wide text-ink/70">{coats.servicesLabel}</dt>
                  <dd className="body-6 mt-1">{c.services}</dd>
                </div>
              </dl>
            </Reveal>
          )
        })}
      </ul>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Reveal className="rounded-2xl border border-ink/10 bg-orange p-6">
          <Icon name={coats.puppy.icon} size={32} weight="fill" />
          <h3 className="title-1 mt-4">{coats.puppy.title}</h3>
          <p className="body-3 mt-2">{coats.puppy.text}</p>
        </Reveal>
        {coats.tips.map((t, i) => (
          <Reveal key={t.title} delay={(i + 1) * 80} className="rounded-2xl border border-ink/10 bg-turquoise p-6">
            <Icon name={t.icon} size={32} weight="fill" />
            <h3 className="title-1 mt-4">{t.title}</h3>
            <p className="body-3 mt-2">{t.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
