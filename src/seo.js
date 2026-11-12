import { SITE_URL, business, faqs } from './content.js'

// En el schema no deben salir los {{placeholders}}.
const plain = (t) => t.replace(/\{\{[^}]+\}\}/g, 'por confirmar')

export const seo = {
  title: 'Peluquería canina en Salamanca, Ate | Fashion Dog',
  description:
    'Peluquería canina en Salamanca, Ate. Baño y baño con corte con precio claro. Pagas con efectivo, tarjeta o Yape. Reserva por WhatsApp.',
  image: `${SITE_URL}/img/hero.jpg`,
  url: `${SITE_URL}/`,
}

// Metadatos por ruta. Home se indexa; privacidad y términos se indexan sin destacar; el 404 no.
export const pages = {
  '/': { title: seo.title, description: seo.description, robots: 'index,follow' },
  '/privacidad': {
    title: 'Política de privacidad | Fashion Dog',
    description: 'Cómo Peluquería Canina Fashion Dog trata los datos que compartes al escribirnos por WhatsApp.',
    robots: 'index,follow',
  },
  '/terminos': {
    title: 'Términos de uso | Fashion Dog',
    description: 'Términos de uso del sitio web de Peluquería Canina Fashion Dog en Salamanca, Ate.',
    robots: 'index,follow',
  },
  '/404': {
    title: 'Página no encontrada | Fashion Dog',
    description: 'La página que buscas no existe. Vuelve al inicio de Peluquería Canina Fashion Dog.',
    robots: 'noindex,follow',
  },
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

export function headTags(path = '/') {
  const p = pages[path] ?? pages['/404']
  const url = `${SITE_URL}${path === '/' || path === '/404' ? '/' : path}`
  return [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}" />`,
    `<meta name="robots" content="${p.robots}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="es_PE" />`,
    `<meta property="og:site_name" content="${esc(business.name)}" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${seo.image}" />`,
    `<meta property="og:image:alt" content="${esc('Perro recién arreglado en Peluquería Canina Fashion Dog')}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(p.title)}" />`,
    `<meta name="twitter:description" content="${esc(p.description)}" />`,
    `<meta name="twitter:image" content="${seo.image}" />`,
  ].join('\n    ')
}

export function schemaTags() {
  return [localBusinessJsonLd(), faqJsonLd()]
    .map((d) => `<script type="application/ld+json">${JSON.stringify(d)}</script>`)
    .join('\n    ')
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#negocio`,
    name: business.name,
    description: seo.description,
    url: SITE_URL,
    image: seo.image,
    telephone: business.phoneIntl,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.streetAddress,
      addressLocality: business.locality,
      addressRegion: business.region,
      addressCountry: business.country,
    },
    areaServed: business.zones.map((name) => ({ '@type': 'Place', name })),
    paymentAccepted: 'Efectivo, tarjeta, Yape',
    currenciesAccepted: 'PEN',
    sameAs: [business.facebook],
  }
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: plain(f.q),
      acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
    })),
  }
}
