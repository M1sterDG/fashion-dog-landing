// Todo el copy de la landing vive aquí. Los datos que faltan van como {{placeholder}}
// y se muestran resaltados en la página hasta que los reemplaces.
// Regla de redacción: sin guiones dentro de las frases.

/* ------------------------------------------------------------------ *
 * FOTOS DISPONIBLES
 * Agrega aquí el nombre de cada foto que ya pusiste en public/img/.
 * Una sección de fotos solo se muestra si tiene al menos una foto real.
 * Para ver los marcadores mientras desarrollas, abre la página con ?placeholders=1
 *
 * Ejemplo:
 *   export const availableImages = ['hero.jpg', 'galeria-1.jpg', 'galeria-2.jpg',
 *     'antes-1.jpg', 'despues-1.jpg', 'local-1.jpg', 'equipo-1.jpg', 'video-1.mp4']
 * ------------------------------------------------------------------ */
export const availableImages = [
  'ia-hero.jpg',
  'estilo-osito.jpg',
  'estilo-cachorro.jpg',
  'estilo-raza.jpg',
  'estilo-higienico.jpg',
  'ia-antes-1.jpg', 'ia-antes-2.jpg', 'ia-antes-3.jpg',
  'ia-despues-1.jpg', 'ia-despues-2.jpg', 'ia-despues-3.jpg',
  'ia-galeria-1.jpg', 'ia-galeria-2.jpg', 'ia-galeria-3.jpg', 'ia-galeria-4.jpg', 'ia-galeria-5.jpg',
]

// Máximos por sección.
export const LIMITS = { bento: 5, beforeAfter: 3, local: 3 }

export const has = (file) => availableImages.includes(file)

// Modo de desarrollo: ?placeholders=1 muestra marcadores donde falta una foto.
export function placeholdersOn() {
  return typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('placeholders') === '1'
}

// Números de foto que se deben mostrar para un prefijo (galeria, local...).
export function photoSlots(prefix, max, total = 8) {
  const all = Array.from({ length: total }, (_, i) => i + 1)
  if (placeholdersOn()) return all.slice(0, max)
  return all.filter((n) => has(`${prefix}-${n}.jpg`)).slice(0, max)
}

// Fotos de la galería (bento). Las reales son galeria-N.jpg; las generadas con IA empiezan con "ia-"
// (ia-galeria-N.jpg) y llevan la etiqueta "Imagen referencial". Si existen ambas para el mismo N, gana la real.
export function gallerySlots(max, total = 8) {
  const all = Array.from({ length: total }, (_, i) => i + 1)
  if (placeholdersOn()) return all.slice(0, max).map((n) => ({ n, ia: false }))
  const out = []
  for (const n of all) {
    if (has(`galeria-${n}.jpg`)) out.push({ n, ia: false })
    else if (has(`ia-galeria-${n}.jpg`)) out.push({ n, ia: true })
  }
  return out.slice(0, max)
}

// Punto de enfoque (object-position) de cada foto, para que el recorte no corte la cara del perro.
// Si una foto no aparece aquí se centra. Ajusta estos valores cuando cambies las fotos.
export const imageFocus = {
  'ia-hero.jpg': '55% 50%',
  'estilo-osito.jpg': '50% 50%',
  'estilo-cachorro.jpg': '90% 50%',
  'estilo-raza.jpg': '70% 50%',
  'estilo-higienico.jpg': '50% 40%',
  'ia-galeria-1.jpg': '56% 35%',
  'ia-galeria-2.jpg': '50% 30%',
  'ia-galeria-3.jpg': '50% 30%',
  'ia-galeria-4.jpg': '50% 30%',
  'ia-galeria-5.jpg': '50% 30%',
}
export function focusFor(file) {
  if (imageFocus[file]) return imageFocus[file]
  // Antes y después con IA: fotos verticales con la cara en el tercio superior.
  if (/^ia-(antes|despues)-/.test(file)) return '50% 25%'
  return '50% 50%'
}

// Pares antes y después: solo cuentan los casos que tienen las dos fotos.
// Las reales se llaman antes-N.jpg y despues-N.jpg. Las generadas con IA empiezan con "ia-"
// (ia-antes-N.jpg y ia-despues-N.jpg) y la página les pone la etiqueta "Ejemplo referencial".
export function pairSlots(max, total = 6) {
  const all = Array.from({ length: total }, (_, i) => i + 1)
  if (placeholdersOn()) return all.slice(0, max).map((n) => ({ n, ia: false }))
  const pairs = []
  for (const n of all) {
    if (has(`antes-${n}.jpg`) && has(`despues-${n}.jpg`)) pairs.push({ n, ia: false })
    else if (has(`ia-antes-${n}.jpg`) && has(`ia-despues-${n}.jpg`)) pairs.push({ n, ia: true })
  }
  return pairs.slice(0, max)
}

// Foto principal del hero: hero.jpg y, si no existe, ia-hero.jpg. null si no hay ninguna.
export const heroIsIa = () => (heroPhoto() ?? '').startsWith('ia-')
export function heroPhoto() {
  if (has('hero.jpg')) return 'hero.jpg'
  if (has('ia-hero.jpg')) return 'ia-hero.jpg'
  return placeholdersOn() ? 'hero.jpg' : null
}

export const business = {
  name: 'Peluquería Canina Fashion Dog',
  short: 'Fashion Dog',
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
  // Horario confirmado por recepción.
  hours: [
    { days: 'Lunes a viernes', time: '9:00 a. m. a 6:00 p. m.' },
    { days: 'Sábados', time: '8:00 a. m. a 6:00 p. m.' },
  ],
  hoursText: 'lunes a viernes de 9:00 a. m. a 6:00 p. m. y sábados de 8:00 a. m. a 6:00 p. m.',
  hoursSpec: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { days: ['Saturday'], opens: '08:00', closes: '18:00' },
  ],
}

/* ---------- WhatsApp: mensaje confirmado por recepción ---------- */
// encodeURIComponent codifica saltos de línea, emoji y el signo +.
export function buildWhatsappUrl(service = 'Baño / Baño + corte') {
  const message = [
    'Hola Fashion Dog, quiero reservar una cita 🐶',
    'Nombre del perrito:',
    'Apellido del dueño:',
    'Raza:',
    `Servicio: ${service}`,
    'Día y hora:',
  ].join('\n')
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`
}
export const whatsappUrl = buildWhatsappUrl()

export const mapsLink =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Av. Paracas 363, Urb. Salamanca, Ate, Lima, Perú')
export const mapsEmbed =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('Av. Paracas 363, Urb. Salamanca, Ate, Lima, Perú') +
  '&output=embed'

export const payments = {
  label: 'Medios de pago',
  items: [
    { icon: 'Money', label: 'Efectivo' },
    { icon: 'CreditCard', label: 'Tarjeta' },
    { icon: 'DeviceMobile', label: 'Yape' },
  ],
}

export const navAll = [
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'estilos', label: 'Estilos' },
  { id: 'galeria', label: 'Galería' },
  { id: 'tipo-de-pelo', label: 'Tipo de pelo' },
  { id: 'donde-estamos', label: 'Dónde estamos' },
  { id: 'preguntas', label: 'Preguntas' },
]

/* ---------- Hero: aquí vive el mensaje de transparencia (junto con el lema) ---------- */
export const hero = {
  eyebrow: 'Peluquería canina en Salamanca, Ate',
  titleLines: ['Tu perro, bien cuidado.', 'Tú, bien informado.'],
  subtitle:
    'Te decimos qué servicio recibe tu perro, cuánto cuesta y cómo le fue cuando vienes por él. Sin sorpresas de precio ni de trato.',
  cta: 'Reservar por WhatsApp',
  ctaNote: 'Escribes por WhatsApp y te confirmamos el turno.',
  chips: [
    { icon: 'Clock', text: 'Lun a Sáb' },
    { icon: 'CreditCard', text: 'Efectivo · Tarjeta · Yape' },
    { icon: 'Tag', text: 'Baño desde S/ 35' },
  ],
}

/* ---------- Cómo funciona (incluye lo que antes eran los compromisos) ---------- */
export const how = {
  eyebrow: 'Cómo funciona',
  title: 'Reservar es así de simple',
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
  team: {
    title: 'Quiénes lo atienden',
    text: '{{nombre groomer}} y el equipo de Fashion Dog llevan {{años}} años cuidando perros en Salamanca.',
  },
}

/* ---------- Servicios y precios confirmados por recepción ---------- */
export const services = {
  eyebrow: 'Servicios y precios',
  title: 'Elige el servicio de tu perro',
  reserve: 'Reservar este servicio',
  items: [
    {
      icon: 'Bathtub',
      title: 'Baño',
      lead: 'El baño incluye:',
      includes: [
        { icon: 'PawPrint', text: 'Corte de uñas' },
        { icon: 'Ear', text: 'Limpieza de oídos' },
        { icon: 'SprayBottle', text: 'Perfume' },
        { icon: 'Gift', text: 'Lazo' },
        { icon: 'HandSoap', text: 'Limpieza de glándulas perianales' },
        { icon: 'Dog', text: 'Recorte de carita y patitas, si lo necesita' },
      ],
      whatsappService: 'Baño',
    },
    {
      icon: 'Scissors',
      title: 'Baño + corte',
      lead: 'Todo lo del baño, más el corte según su tipo de pelo.',
      includes: [
        { icon: 'Bathtub', text: 'Todo lo del baño' },
        { icon: 'Scissors', text: 'Corte según su tipo de pelo' },
      ],
      whatsappService: 'Baño + corte',
    },
  ],
  notes: [
    { icon: 'Flask', text: 'Usamos 2 tipos de shampoo: {{shampoos}}.' },
    { icon: 'Stethoscope', text: 'Baño medicado solo con indicación de tu veterinario.' },
  ],
  // Precios confirmados por recepción. "from" marca los precios que son "desde".
  tiers: [
    {
      size: 'Pequeños y medianos',
      note: '',
      prices: [
        { label: 'Baño', from: true, amount: 'S/ 35' },
        { label: 'Baño + corte', from: true, amount: 'S/ 50' },
      ],
    },
    {
      size: 'Grandes',
      note: 'De tamaño Golden a Rottweiler',
      prices: [
        { label: 'Baño', from: false, amount: 'S/ 50' },
        { label: 'Baño + corte', from: false, amount: 'S/ 70' },
      ],
    },
  ],
  priceNote: 'El precio exacto depende del tamaño y del estado del pelo. Te lo confirmamos por WhatsApp antes de tu cita.',
  priceRange: 'S/ 35 - S/ 70',
}

/* ---------- Lema: el otro lugar donde vive la transparencia ---------- */
export const tagline = {
  text: 'Sabes qué le hacemos, cuánto cuesta y cómo le fue.',
}

/* ---------- Estilos de corte: solo se muestran los que tienen foto en availableImages ---------- */
export const estilos = {
  eyebrow: 'Estilos de corte',
  title: 'Elige cómo lo quieres',
  intro: 'Mira un estilo de referencia y cuéntanos cuál prefieres al reservar.',
  tag: 'Imagen referencial',
  items: [
    { key: 'osito', file: 'estilo-osito.jpg', name: 'Osito', text: 'Pelo parejo y redondeado, con aspecto de peluche.' },
    { key: 'cachorro', file: 'estilo-cachorro.jpg', name: 'Cachorro', text: 'Corte corto y parejo en todo el cuerpo, fácil de mantener.' },
    { key: 'raza', file: 'estilo-raza.jpg', name: 'Corte de raza', text: 'El corte clásico de cada raza, según su estilo.' },
    { key: 'higienico', file: 'estilo-higienico.jpg', name: 'Corte higiénico', text: 'Recorte de zonas delicadas para que esté limpio y cómodo.' },
  ],
}
export function estiloSlots() {
  if (placeholdersOn()) return estilos.items
  return estilos.items.filter((e) => has(e.file))
}

export const gallery = {
  eyebrow: 'Galería',
  title: 'Así salen de Fashion Dog',
  // Mientras todas las fotos sean generadas con IA, la galería usa este título. Con fotos reales vuelve al original.
  titleIa: 'Así pueden quedar',
  refTag: 'Imagen referencial',
  beforeAfterTitle: 'Antes y después',
  beforeAfterHint: 'Toca cada foto para ver el antes y el después.',
  before: 'Antes',
  after: 'Después',
  iaTag: 'Ejemplo referencial',
}

export const coats = {
  eyebrow: 'Tipo de pelo',
  title: 'Qué necesita tu perro según su pelaje',
  intro:
    'Cada pelaje pide un cuidado distinto. Esta guía es general: tu perro puede necesitar otra frecuencia según su piel, su edad y su vida diaria.',
  bathLabel: 'Baño',
  careLabel: 'Cuidado',
  items: [
    {
      icon: 'Sun',
      name: 'Pelo corto',
      examples: 'Beagle, Pug, Bulldog',
      bath: 'Cada 4 a 8 semanas',
      care: 'Cepillado semanal con guante o cepillo suave para retirar el pelo muerto.',
    },
    {
      icon: 'Wind',
      name: 'Pelo largo y sedoso',
      examples: 'Shih tzu, Yorkshire, Maltés',
      bath: 'Cada 3 a 4 semanas',
      care: 'Cepillado diario para que no se formen nudos. Un corte de mantenimiento lo hace más fácil de peinar.',
    },
    {
      icon: 'Cloud',
      name: 'Pelo rizado o lanudo',
      examples: 'Poodle, Bichón frisé, Schnauzer',
      bath: 'Cada 3 a 4 semanas',
      care: 'Cepillado frecuente y corte regular, porque el pelo rizado se enreda desde la raíz.',
    },
    {
      icon: 'Snowflake',
      name: 'Doble capa',
      examples: 'Husky, Pastor alemán, Golden retriever',
      bath: 'Cada 6 a 8 semanas',
      care: 'Cepillado frecuente en época de muda. No lo rapes: el subpelo lo protege del calor y del frío.',
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

/* ---------- Testimonios: se muestran solo cuando haya reales ---------- */
// Cuando tengas testimonios reales, ponlos en "items" con { text, author, dog } sin llaves dobles.
export const testimonials = {
  eyebrow: 'Familias de Fashion Dog',
  title: 'Lo que cuentan quienes ya vinieron',
  items: [],
  placeholderItems: [
    { text: '{{testimonio}}', author: '{{nombre cliente}}', dog: '{{nombre de su perro}}' },
    { text: '{{testimonio}}', author: '{{nombre cliente}}', dog: '{{nombre de su perro}}' },
    { text: '{{testimonio}}', author: '{{nombre cliente}}', dog: '{{nombre de su perro}}' },
  ],
}
export function testimonialItems() {
  if (testimonials.items.length) return testimonials.items
  return placeholdersOn() ? testimonials.placeholderItems : []
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
  localAlt: [
    'Fachada de la peluquería canina Fashion Dog en Av. Paracas 363, Salamanca',
    'Zona de recepción de Fashion Dog',
    'Zona de baño de Fashion Dog',
  ],
  localHint: ['Fachada', 'Recepción', 'Zona de baño'],
}

// Respuestas redactadas para ser útiles sin inventar políticas. Las políticas van como placeholder.
export const faqs = [
  {
    q: '¿Cuánto cuesta y cómo se paga?',
    a: 'Pequeños y medianos: baño desde S/ 35 y baño + corte desde S/ 50. Grandes, de tamaño Golden a Rottweiler: baño S/ 50 y baño + corte S/ 70. El precio exacto depende del tamaño y del estado del pelo, y te lo confirmamos por WhatsApp antes de tu cita. Aceptamos efectivo, tarjeta y Yape.',
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
    a: `Estamos en Av. Paracas 363, Urb. Salamanca, en Ate. Atendemos a quienes vienen de Ate, Salamanca, San Borja, Lima y La Molina. Horario: ${business.hoursText}.`,
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
  blurb: 'Peluquería canina en Salamanca, Ate.',
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
}
