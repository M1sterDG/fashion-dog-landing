import { CaretDown } from '@phosphor-icons/react'
import { faqs } from '../content.js'
import { Reveal, Section, SectionHeader, T } from '../components/ui.jsx'

export default function Faq() {
  return (
    <Section id="preguntas" bg="bg-turquoise-soft">
      <SectionHeader eyebrow="Preguntas frecuentes" title="Lo que casi todos preguntan antes de reservar" />

      <div className="mt-10 flex max-w-[680px] flex-col gap-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={(i % 4) * 60}>
            <details className="group rounded-2xl border border-ink/10 bg-cream">
              <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-4 rounded-2xl p-4 transition-colors duration-300 ease-base hover:bg-orange-soft">
                <h3 className="title-3">{f.q}</h3>
                <CaretDown
                  size={20}
                  weight="bold"
                  className="faq-caret shrink-0 transition-transform duration-500 ease-base"
                  aria-hidden="true"
                />
              </summary>
              <p className="faq-answer body-3 px-4 pb-4 text-ink/80">
                <T>{f.a}</T>
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
