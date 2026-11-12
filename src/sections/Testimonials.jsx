import { Quotes } from '@phosphor-icons/react'
import { testimonialItems, testimonials } from '../content.js'
import { Reveal, Section, SectionHeader, T } from '../components/ui.jsx'

// Home solo dibuja esta sección si testimonialItems() trae testimonios reales.
export default function Testimonials({ prev, wave }) {
  const items = testimonialItems()
  return (
    <Section id="testimonios" bg="cream" prev={prev} wave={wave}>
      <SectionHeader eyebrow={testimonials.eyebrow} title={testimonials.title} />

      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {items.map((t, i) => (
          <Reveal as="li" key={i} delay={i * 80} className="flex flex-col rounded-3xl bg-turquoise-soft p-6">
            <Quotes size={40} weight="fill" className="text-orange" aria-hidden="true" />
            <blockquote className="body-3 mt-4 flex-1">
              <T>{t.text}</T>
            </blockquote>
            <p className="title-3 mt-4">
              <T>{t.author}</T>
            </p>
            <p className="caption-2 text-ink/70">
              Dueño de <T>{t.dog}</T>
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
