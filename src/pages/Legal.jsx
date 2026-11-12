import { ArrowLeft } from '@phosphor-icons/react'
import { business } from '../content.js'
import { Logo, T } from '../components/ui.jsx'
import Footer from '../sections/Footer.jsx'

const updated = '12 de noviembre de 2026'

const privacy = {
  key: 'privacidad',
  title: 'Política de privacidad',
  sections: [
    {
      h: 'Quién es responsable',
      p: [`${business.name}, con local en ${business.addressLine}. Correo de contacto: ${business.email}.`],
    },
    {
      h: 'Qué datos tratamos',
      p: [
        'Este sitio no tiene cuentas ni formularios. Si nos escribes por WhatsApp, recibimos tu número de teléfono y lo que nos cuentes, como el nombre, la raza y el tamaño de tu perro.',
        'Usamos esos datos solo para responderte, darte el precio y confirmar tu turno. No los vendemos.',
      ],
    },
    {
      h: 'Servicios de terceros',
      p: [
        'WhatsApp pertenece a Meta y se rige por sus propias políticas. El mapa de la sección Dónde estamos lo carga Google Maps, que puede recibir datos como tu dirección IP y usar cookies. Este sitio no usa cookies propias.',
        'Si agregamos herramientas de medición, actualizaremos esta página.',
      ],
    },
    {
      h: 'Cuánto tiempo guardamos tus datos',
      p: ['{{plazo de conservación de datos}}'],
    },
    {
      h: 'Tus derechos',
      p: [
        `Puedes pedirnos acceso, rectificación, cancelación u oposición sobre tus datos personales, según la Ley N.° 29733, Ley de Protección de Datos Personales del Perú. Escríbenos a ${business.email}.`,
      ],
    },
  ],
}

const terms = {
  key: 'terminos',
  title: 'Términos de uso',
  sections: [
    {
      h: 'Sobre este sitio',
      p: [
        `Este sitio presenta los servicios de ${business.name} en Salamanca, Ate. La información es referencial y puede cambiar.`,
      ],
    },
    {
      h: 'Precios y horarios',
      p: [
        'El precio final y el horario de atención se confirman por WhatsApp antes de reservar. Precios: {{precio}}. Horario: {{horario}}.',
      ],
    },
    {
      h: 'Reservas',
      p: [
        `Las reservas se coordinan por WhatsApp al ${business.phoneDisplay}. Un turno queda confirmado cuando te lo confirmamos por ese medio.`,
        'Vacunas: {{política de vacunas}}. Cancelaciones y cambios de turno: {{política de cancelación}}.',
      ],
    },
    {
      h: 'Responsabilidad',
      p: ['{{política de responsabilidad y manejo del perro}}'],
    },
    {
      h: 'Contenido del sitio',
      p: [
        'Las marcas, el logo y las fotos de este sitio pertenecen a Peluquería Canina Fashion Dog o se usan con permiso. No puedes reutilizarlos sin autorización.',
      ],
    },
    {
      h: 'Cambios y contacto',
      p: [`Podemos actualizar estos términos. Si tienes dudas, escríbenos a ${business.email}.`],
    },
  ],
}

export const legalPages = { '/privacidad': privacy, '/terminos': terms }

export default function Legal({ path }) {
  const page = legalPages[path]
  return (
    <>
      <header className="bg-cream pt-4">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4">
          <a href="/" aria-label="Ir al inicio" className="rounded-full">
            <Logo className="h-12" />
          </a>
          <a
            href="/"
            className="button-sm inline-flex min-h-10 items-center gap-2 rounded-full border border-ink/20 px-3 py-2 transition-colors duration-300 ease-base hover:bg-turquoise-soft"
          >
            <ArrowLeft size={20} weight="bold" aria-hidden="true" />
            Volver al inicio
          </a>
        </div>
      </header>

      <main id="contenido" className="bg-cream py-16 md:py-24">
        <article className="mx-auto w-full max-w-[680px] px-4">
          <h1 className="heading-4 md:heading-3">{page.title}</h1>
          <p className="caption-2 mt-2 text-ink/70">Última actualización: {updated}</p>
          {page.sections.map((s) => (
            <section key={s.h} className="mt-8">
              <h2 className="heading-6">{s.h}</h2>
              {s.p.map((t, i) => (
                <p key={i} className="body-3 mt-3 text-ink/80">
                  <T>{t}</T>
                </p>
              ))}
            </section>
          ))}
        </article>
      </main>
      <Footer current={page.key} />
    </>
  )
}
