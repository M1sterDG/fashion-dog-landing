import { estilos, estiloSlots } from '../content.js'
import { Img, Reveal, Section, SectionHeader } from '../components/ui.jsx'

// Solo se dibujan los estilos que tienen foto en availableImages. Home oculta la sección si no hay ninguna.
export default function Estilos({ prev, wave }) {
  const items = estiloSlots()
  return (
    <Section id="estilos" bg="cream" prev={prev} wave={wave}>
      <SectionHeader eyebrow={estilos.eyebrow} title={estilos.title} intro={estilos.intro} />

      <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {items.map((e, i) => (
          // Tarjeta de 24px con 8px de margen: la foto interior usa 16px (24 menos 8).
          <Reveal as="li" key={e.key} delay={(i % 4) * 80} className="flex flex-col rounded-3xl bg-orange-soft p-2">
            <div className="relative">
              <Img
                file={e.file}
                alt={`Estilo de corte ${e.name}`}
                hint={`Estilo ${e.name}`}
                className="aspect-4/3 rounded-2xl bg-cream"
              />
              {/* Etiqueta: 16px de radio menos 8px de margen da 8px (rounded-lg) */}
              <span className="caption-3 absolute bottom-2 left-2 rounded-lg bg-cream px-2 py-1 text-ink">{estilos.tag}</span>
            </div>
            <div className="p-3">
              <h3 className="title-1">{e.name}</h3>
              <p className="body-6 mt-1 text-ink/70">{e.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
