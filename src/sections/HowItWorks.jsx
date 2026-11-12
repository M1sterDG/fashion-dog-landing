import { altText, has, how, placeholdersOn } from '../content.js'
import { Icon } from '../components/icons.jsx'
import { Img, Reveal, Section, SectionHeader, T } from '../components/ui.jsx'

const cardBg = ['bg-turquoise', 'bg-orange', 'bg-turquoise-soft']
const numberBg = ['bg-cream', 'bg-cream', 'bg-orange']

export default function HowItWorks({ prev, wave }) {
  const showTeam = has('equipo-1.jpg') || placeholdersOn()
  return (
    <Section id="como-funciona" bg="cream" prev={prev} wave={wave}>
      <SectionHeader eyebrow={how.eyebrow} title={how.title} />

      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {how.steps.map((s, i) => (
          <Reveal
            as="li"
            key={s.title}
            delay={i * 100}
            className={`flex flex-col rounded-3xl p-6 ${cardBg[i]}`}
          >
            <div className="flex items-center justify-between">
              <span className={`heading-4 flex h-16 w-16 items-center justify-center rounded-full ${numberBg[i]}`}>
                {i + 1}
              </span>
              <Icon name={s.icon} size={48} weight="duotone" />
            </div>
            <h3 className="heading-5 mt-6">{s.title}</h3>
            <p className="body-3 mt-2">{s.text}</p>
          </Reveal>
        ))}
      </ol>

      {/* Solo si hay foto del equipo. 24px de radio menos 8px de margen deja 16px en la foto. */}
      {showTeam && (
        <Reveal className="mt-4 grid gap-2 rounded-3xl bg-orange-soft p-2 md:grid-cols-2 md:items-center">
          <Img
            file="equipo-1.jpg"
            alt={altText.equipo}
            hint="Foto del equipo de groomers"
            className="aspect-4/3 rounded-2xl"
          />
          <div className="p-4 md:p-8">
            <h3 className="heading-5">{how.team.title}</h3>
            <p className="body-3 mt-3 text-ink/70">
              <T>{how.team.text}</T>
            </p>
          </div>
        </Reveal>
      )}
    </Section>
  )
}
