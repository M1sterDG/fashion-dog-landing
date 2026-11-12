import { coats } from '../content.js'
import { Icon } from '../components/icons.jsx'
import { Reveal, Section, SectionHeader } from '../components/ui.jsx'

export default function CoatGuide({ prev, wave }) {
  return (
    <Section id="tipo-de-pelo" bg="orange-soft" prev={prev} wave={wave}>
      <SectionHeader eyebrow={coats.eyebrow} title={coats.title} intro={coats.intro} />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {coats.items.map((c, i) => {
          const turq = i % 2 === 0
          return (
            <Reveal as="li" key={c.name} delay={(i % 4) * 80} className="flex flex-col rounded-3xl bg-cream p-6">
              <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${turq ? 'bg-turquoise' : 'bg-orange'}`}>
                <Icon name={c.icon} size={28} weight="duotone" />
              </span>
              <h3 className="title-1 mt-4">{c.name}</h3>
              <p className="caption-2 mt-1 text-ink/70">{c.examples}</p>

              <dl className="mt-3 flex flex-1 flex-col gap-2">
                <div>
                  <dt className="caption-3 uppercase tracking-wide text-ink/70">{coats.bathLabel}</dt>
                  <dd className="body-4 mt-1">{c.bath}</dd>
                </div>
                <div>
                  <dt className="caption-3 uppercase tracking-wide text-ink/70">{coats.careLabel}</dt>
                  <dd className="body-6 mt-1">{c.care}</dd>
                </div>
              </dl>
            </Reveal>
          )
        })}
      </ul>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Reveal className="rounded-3xl bg-orange p-6">
          <Icon name={coats.puppy.icon} size={28} weight="fill" />
          <h3 className="title-1 mt-2">{coats.puppy.title}</h3>
          <p className="body-3 mt-2">{coats.puppy.text}</p>
        </Reveal>
        {coats.tips.map((t, i) => (
          <Reveal key={t.title} delay={(i + 1) * 80} className="rounded-3xl bg-turquoise p-6">
            <Icon name={t.icon} size={28} weight="fill" />
            <h3 className="title-1 mt-2">{t.title}</h3>
            <p className="body-3 mt-2">{t.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
