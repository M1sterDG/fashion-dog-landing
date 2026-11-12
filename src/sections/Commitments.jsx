import { altText, commitments } from '../content.js'
import { Icon } from '../components/icons.jsx'
import { Img, Reveal, Section, SectionHeader, T } from '../components/ui.jsx'

export default function Commitments() {
  return (
    <Section id="transparencia" bg="bg-turquoise-soft">
      <SectionHeader eyebrow={commitments.eyebrow} title={commitments.title} />

      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {commitments.items.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 80} className="rounded-2xl border border-ink/10 bg-cream p-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-turquoise">
              <Icon name={item.icon} size={28} weight="duotone" />
            </span>
            <h3 className="title-1 mt-4">{item.title}</h3>
            <p className="body-3 mt-2 text-ink/70">{item.text}</p>
          </Reveal>
        ))}
      </ul>

      {/* Equipo: tarjeta de 24px con 8px de margen, la foto interior usa 16px (24 menos 8) */}
      <Reveal className="mt-4 grid gap-2 rounded-3xl border border-ink/10 bg-cream p-2 md:grid-cols-2 md:items-center">
        <Img
          file="equipo-1.jpg"
          alt={altText.equipo}
          tone="orange"
          hint="Foto del equipo de groomers"
          className="aspect-4/3 rounded-2xl"
        />
        <div className="p-4 md:p-8">
          <h3 className="heading-5">{commitments.team.title}</h3>
          <p className="body-3 mt-3 text-ink/70">
            <T>{commitments.team.text}</T>
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
