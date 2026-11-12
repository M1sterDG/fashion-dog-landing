// Todo el copy de la landing vive aquí. Los datos que faltan van como {{placeholder}}
// y se muestran resaltados en la página hasta que los reemplaces.
// Regla de redacción: sin guiones dentro de las frases.

export const SITE_URL = 'https://peluqueriacaninafashiondog.com'

export const business = {
  name: 'Peluquería Canina Fashion Dog',
  short: 'Fashion Dog',
  tagline: 'En Fashion Dog Salamanca, ofrecemos transparencia en el servicio',
  streetAddress: 'Av. Paracas 363, Urb. Salamanca',
  locality: 'Ate',
  region: 'Lima',
  country: 'PE',
  addressLine: 'Av. Paracas 363, Urb. Salamanca, Ate, Lima, Perú',
  phoneDisplay: '906 047 677',
  phoneIntl: '+51906047677',
  whatsappNumber: '51906047677',
  email: 'fashiondogsalamanca@gmail.com',
  facebook: 'https://www.facebook.com/peluqueriacaninafashiondog',
  // SUPUESTO: zonas tomadas de la lista de Facebook, por confirmar.
  zones: ['Ate', 'Salamanca', 'San Borja', 'Lima', 'La Molina'],
  hours: '{{horario}}',
}

// Mensaje confirmado por recepción. encodeURIComponent codifica saltos de línea, emoji y el signo +.
export const WHATSAPP_MESSAGE = [
  'Hola Fashion Dog, quiero reservar una cita 🐶',
  'Nombre del perrito:',
  'Apellido del dueño:',
  'Raza:',
  'Servicio: Baño / Baño + corte',
  'Día y hora:',
].join('\n')

export const whatsappUrl = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export const mapsLink =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Av. Paracas 363, Urb. Salamanca, Ate, Lima, Perú')
export const mapsEmbed =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('Av. Paracas 363, Urb. Salamanca, Ate, Lima, Perú') +
  '&output=embed'

// Medios de pago confirmados por recepción.
export const payments = {
  label: 'Medios de pago',
  items: [
    { icon: 'Money', label: 'Efectivo' },
    { icon: 'CreditCard', label: 'Tarjeta' },
    { icon: 'DeviceMobile', label: 'Yape' },
  ],
}

export const nav = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'galeria', label: 'Galería' },
  { id: 'tipo-de-pelo', label: 'Tipo de pelo' },
  { id: 'donde-estamos', label: 'Dónde estamos' },
  { id: 'preguntas', label: 'Preguntas' },
]

export const hero = {
  eyebrow: 'Peluquería canina en Salamanca, Ate',
  titleLines: ['Tu perro, bien cuidado.', 'Tú, bien informado.'],
  subtitle:
    'Te decimos qué servicio recibe tu perro, cuánto cuesta y cómo le fue cuando vienes por él. Sin sorpresas de precio ni de trato.',
  cta: 'Reservar por WhatsApp',
  ctaNote: 'Escribes por WhatsApp y te confirmamos el turno.',
  proof: business.addressLine,
}

// POR CONFIRMAR: compromisos derivados de la frase de marca. Valídalos antes de publicar.
export const commitments = {
  eyebrow: 'Transparencia',
  title: 'Sabes qué pasa con tu perro en cada paso',
  items: [
    {
      icon: 'Receipt',
      title: 'Precio claro antes de empezar',
      text: 'Te decimos cuánto cuesta cada servicio antes de empezar. No hay cobros que no hayas aceptado.',
    },
    {
      icon: 'Eye',
      title: 'Sabes qué le hacemos',
      text: 'Te explicamos si tu perro recibe baño o baño con corte, y qué necesita según su pelaje.',
    },
    {
      icon: 'ChatCircleText',
      title: 'Te contamos cómo estuvo',
      text: 'Cuando vienes por él, te contamos cómo se portó y qué hicimos, con calma y sin apuro.',
    },
  ],
  team: {
    title: 'Quiénes lo atienden',
    text: '{{nombre groomer}} y el equipo de Fashion Dog llevan {{años}} años cuidando perros en Salamanca.',
  },
}

// Servicios y precios confirmados por recepción.
export const services = {
  eyebrow: 'Servicios y precios',
  title: 'Dos servicios, precios claros',
  intro: 'El precio depende del tamaño de tu perro. Te lo confirmamos por WhatsApp antes de reservar.',
  items: [
    {
      icon: 'Bathtub',
      title: 'Baño',
      text: 'Baño con shampoo para perros, enjuague completo y secado.',
    },
    {
      icon: 'Scissors',
      title: 'Baño + corte',
      text: 'El baño completo más corte según el tipo de pelo de tu perro.',
    },
  ],
  notes: [
    {
      icon: 'Flask',
      title: 'Shampoos',
      text: 'Usamos 2 tipos de shampoo: {{shampoos}}.',
    },
    {
      icon: 'Stethoscope',
      title: 'Baño medicado',
      text: 'Baño medicado solo con indicación de tu veterinario.',
    },
  ],
  pricing: {
    title: 'Precio según el tamaño',
    tiers: [
      { size: 'Perros pequeños', note: '', price: '{{precio}}' },
      { size: 'Perros medianos', note: '', price: '{{precio}}' },
      {
        size: 'Perros grandes',
        note: 'De tamaño Golden a Rottweiler',
        price: 'S/ 50',
        includes: '{{qué incluye}}',
      },
    ],
  },
}

export const tagline = {
  text: 'Fashion Dog Salamanca ofrece transparencia en el servicio. Sabes qué le hacemos a tu perro, cuánto cuesta y cómo le fue.',
}

export const how = {
  eyebrow: 'Cómo funciona',
  title: 'Tres pasos, todos claros',
  steps: [
    {
      icon: 'WhatsappLogo',
      title: 'Reservas por WhatsApp',
      text: 'Escríbenos por WhatsApp con el nombre de tu perrito, su raza, el servicio y el día que prefieres.',
    },
    {
      icon: 'Dog',
      title: 'Traes a tu perro',
      text: 'Llegas a Av. Paracas 363, en Salamanca. Te explicamos el servicio y el precio antes de empezar.',
    },
    {
      icon: 'Heart',
      title: 'Lo recibes y te contamos cómo estuvo',
      text: 'Te decimos qué le hicimos, cómo se portó y cada cuánto conviene volver.',
    },
  ],
}

export const gallery = {
  eyebrow: 'Galería',
  title: 'Así salen de Fashion Dog',
  beforeAfterTitle: 'Antes y después',
  beforeAfterHint: 'Toca cada foto para ver el antes y el después.',
  before: 'Antes',
  after: 'Después',
}

export const coats = {
  eyebrow: 'Tipo de pelo',
  title: 'Qué necesita tu perro según su pelaje',
  intro:
    'Cada pelaje pide un cuidado distinto. Esta guía es general: tu perro puede necesitar otra frecuencia según su piel, su edad y su vida diaria.',
  bathLabel: 'Baño',
  careLabel: 'Cuidado',
  servicesLabel: 'Servicio',
  items: [
    {
      icon: 'Sun',
      name: 'Pelo corto',
      examples: 'Beagle, Pug, Bulldog',
      bath: 'Cada 4 a 8 semanas',
      care: 'Cepillado semanal con guante o cepillo suave para retirar el pelo muerto.',
      services: 'Baño',
    },
    {
      icon: 'Wind',
      name: 'Pelo largo y sedoso',
      examples: 'Shih tzu, Yorkshire, Maltés',
      bath: 'Cada 3 a 4 semanas',
      care: 'Cepillado diario para que no se formen nudos. El corte de mantenimiento hace que sea más fácil de peinar.',
      services: 'Baño o baño con corte',
    },
    {
      icon: 'Cloud',
      name: 'Pelo rizado o lanudo',
      examples: 'Poodle, Bichón frisé, Schnauzer',
      bath: 'Cada 3 a 4 semanas',
      care: 'Cepillado frecuente y corte regular, porque el pelo rizado se enreda desde la raíz.',
      services: 'Baño con corte',
    },
    {
      icon: 'Snowflake',
      name: 'Doble capa',
      examples: 'Husky, Pastor alemán, Golden retriever',
      bath: 'Cada 6 a 8 semanas',
      care: 'Cepillado frecuente en época de muda. No lo rapes: el subpelo lo protege del calor y del frío, y rapar puede dañar el pelo nuevo.',
      services: 'Baño',
    },
  ],
  puppy: {
    icon: 'PawPrint',
    title: 'Primera visita del cachorro',
    text: 'Puede venir cuando tenga las vacunas completas, entre las 12 y 16 semanas aprox. Confirma el esquema con tu veterinario.',
  },
  tips: [
    { icon: 'Broom', title: 'Cepilla antes de bañar', text: 'El agua aprieta los nudos y después cuesta más desenredar.' },
    { icon: 'ShieldCheck', title: 'Nunca champú humano', text: 'La piel del perro tiene otro pH y el champú humano la reseca.' },
  ],
}

export const testimonials = {
  eyebrow: 'Familias de Fashion Dog',
  title: 'Lo que cuentan quienes ya vinieron',
  items: [
    { text: '{{testimonio}}', author: '{{nombre cliente}}', dog: '{{nombre de su perro}}' },
    { text: '{{testimonio}}', author: '{{nombre cliente}}', dog: '{{nombre de su perro}}' },
    { text: '{{testimonio}}', author: '{{nombre cliente}}', dog: '{{nombre de su perro}}' },
  ],
}

export const where = {
  eyebrow: 'Dónde estamos',
  title: 'Te esperamos en Salamanca, Ate',
  addressLabel: 'Dirección',
  zonesLabel: 'Zonas de atención',
  hoursLabel: 'Horario',
  contactLabel: 'Contacto',
  mapCta: 'Abrir en Google Maps',
  mapTitle: 'Mapa de Peluquería Canina Fashion Dog, Av. Paracas 363, Salamanca, Ate',
}

// Respuestas redactadas para ser útiles sin inventar políticas. Las políticas van como placeholder.
export const faqs = [
  {
    q: '¿Cuánto cuesta y cómo se paga?',
    a: 'El precio depende del tamaño de tu perro. Perros grandes, de tamaño Golden a Rottweiler: S/ 50 ({{qué incluye}}). Perros pequeños y medianos: {{precio}}. Aceptamos efectivo, tarjeta y Yape.',
  },
  {
    q: '¿Cómo sé qué le hicieron a mi perro?',
    a: 'Antes de empezar te explicamos si recibirá baño o baño con corte. Cuando vienes por él, te contamos qué le hicimos y cómo se portó.',
  },
  {
    q: '¿Cómo reservo un turno?',
    a: 'Escríbenos por WhatsApp al 906 047 677 con el nombre de tu perrito, su raza, el servicio y el día que prefieres, y te confirmamos el turno.',
  },
  {
    q: '¿Dónde queda y a qué hora atienden?',
    a: 'Estamos en Av. Paracas 363, Urb. Salamanca, en Ate. Atendemos a quienes vienen de Ate, Salamanca, San Borja, Lima y La Molina. Horario: {{horario}}.',
  },
  {
    q: '¿Tratarán bien a mi perro?',
    a: 'Cuéntanos por WhatsApp cómo es tu perro: si le asusta el agua o la secadora, si es nervioso o si no le gusta que le toquen las patas. Así sabemos cómo atenderlo. Política de manejo: {{política de manejo}}.',
  },
  {
    q: '¿Cada cuánto debo bañar a mi perro?',
    a: 'Depende del pelaje. Como guía general: pelo corto cada 4 a 8 semanas, pelo largo o rizado cada 3 a 4 semanas y doble capa cada 6 a 8 semanas. Tu veterinario puede ajustarlo si tu perro tiene alguna condición de piel.',
  },
  {
    q: '¿Pueden rapar a mi perro de doble capa para el verano?',
    a: 'No lo recomendamos. El subpelo protege del calor y del frío, y rapar puede dañar el pelo nuevo. Para esos perros conviene bañarlos con regularidad y cepillarlos bien. Si quieres un corte, consúltanos por WhatsApp antes de reservar.',
  },
  {
    q: '¿Desde qué edad puede venir mi cachorro?',
    a: 'Cuando tenga las vacunas completas, entre las 12 y 16 semanas aprox. Confirma el esquema con tu veterinario antes de traerlo.',
  },
  {
    q: '¿Piden carnet de vacunas y qué pasa si cancelo?',
    a: 'Carnet de vacunas: {{política de vacunas}}. Cancelaciones y cambios de turno: {{política de cancelación}}.',
  },
  {
    q: '¿Hacen baño medicado?',
    a: 'Solo con indicación de tu veterinario. Cuéntanos por WhatsApp qué te indicó antes de reservar.',
  },
]

export const finalCta = {
  title: 'Reserva el turno de tu perro',
  text: 'Escríbenos por WhatsApp con el nombre de tu perrito, su raza, el servicio y el día que prefieres.',
  cta: hero.cta,
}

export const footer = {
  blurb: 'Peluquería canina en Salamanca, Ate. Transparencia en el servicio.',
  privacy: 'Privacidad',
  terms: 'Términos',
  rights: '© 2026 Peluquería Canina Fashion Dog.',
}

// Alt descriptivos. Ajústalos cuando pongas las fotos reales.
export const altText = {
  hero: 'Perro recién arreglado en la peluquería canina Fashion Dog de Salamanca, Ate',
  equipo: 'Equipo de groomers de Fashion Dog atendiendo a un perro',
  galeria: (n) => `Perro arreglado en Fashion Dog, foto ${n} de la galería`,
  antes: (n) => `Perro antes del servicio de peluquería, caso ${n}`,
  despues: (n) => `Mismo perro después del servicio de peluquería, caso ${n}`,
  local: [
    'Fachada de la peluquería canina Fashion Dog en Av. Paracas 363, Salamanca',
    'Zona de recepción de Fashion Dog',
    'Zona de baño de Fashion Dog',
  ],
}
