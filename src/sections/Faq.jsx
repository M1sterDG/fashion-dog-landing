import { CaretDown } from '@phosphor-icons/react'
import { faqs } from '../content.js'
import { Reveal, Section, SectionHeader, T } from '../components/ui.jsx'

export default function Faq({ prev, wave }) {
  return (
    <Section id="preguntas" bg="cream" prev={prev} wave={wave}>
      <SectionHeader eyebrow="Preguntas frecuentes" title="Antes de reservar, esto es lo que preguntan" />

      <div className="mt-10 grid items-start gap-3 lg:grid-cols-2">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={(i % 4) * 60}>
            <details className="group rounded-2xl bg-turquoise-soft">
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
