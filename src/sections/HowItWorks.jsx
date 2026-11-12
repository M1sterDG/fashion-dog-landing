import { how } from '../content.js'
import { Icon } from '../components/icons.jsx'
import { Reveal, Section, SectionHeader } from '../components/ui.jsx'

export default function HowItWorks() {
  return (
    <Section id="como-funciona" bg="bg-cream">
      <SectionHeader eyebrow={how.eyebrow} title={how.title} />

      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {how.steps.map((s, i) => {
          const turq = i % 2 === 0
          return (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 100}
              className={`rounded-2xl border border-ink/10 p-6 ${turq ? 'bg-turquoise-soft' : 'bg-orange-soft'}`}
            >
              <div className="flex items-center justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${turq ? 'bg-turquoise' : 'bg-orange'}`}>
                  <Icon name={s.icon} size={28} weight="duotone" />
                </span>
                <span className="caption-3 rounded-full bg-cream px-3 py-1 uppercase tracking-wide">Paso {i + 1}</span>
              </div>
              <h3 className="title-1 mt-4">{s.title}</h3>
              <p className="body-3 mt-2 text-ink/70">{s.text}</p>
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}
