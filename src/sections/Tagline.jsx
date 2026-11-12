import { useEffect, useRef } from 'react'
import { tagline } from '../content.js'
import { Wave, PawTrail } from '../components/decor.jsx'

// B11: cada palabra pasa de 30% de opacidad a 100% cuando cruza una línea de activación.
// IntersectionObserver por palabra, sin listener de scroll.
export default function Tagline({ prev, wave }) {
  const wrap = useRef(null)

  useEffect(() => {
    const words = [...wrap.current.querySelectorAll('.tag-word')]
    if (typeof IntersectionObserver === 'undefined') {
      words.forEach((w) => w.classList.add('is-on'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        // Las palabras que cruzan la línea a la vez se encienden en orden de lectura.
        const crossed = entries
          .filter((e) => e.isIntersecting || e.boundingClientRect.top < 0)
          .sort((a, b) => words.indexOf(a.target) - words.indexOf(b.target))
        crossed.forEach((e, k) => {
          e.target.style.setProperty('--d', `${Math.min(k * 50, 400)}ms`)
          e.target.classList.add('is-on')
          io.unobserve(e.target)
        })
      },
      // La línea de activación queda al 70% de la altura de la pantalla.
      { rootMargin: '0px 0px -30% 0px', threshold: 0 },
    )
    words.forEach((w) => io.observe(w))
    return () => io.disconnect()
  }, [])

  const words = tagline.text.split(' ')

  return (
    <section id="lema" className="relative overflow-hidden bg-turquoise pt-20 pb-16 text-white md:pb-20">
      {prev && <Wave color={prev} variant={wave} />}
      <PawTrail className="absolute top-16 right-0 hidden h-80 w-48 md:block lg:right-16" />
      <div className="relative mx-auto w-full max-w-6xl px-4">
        <p ref={wrap} className="heading-3 md:heading-2 xl:heading-1 max-w-[680px]">
          {words.map((w, i) => (
            <span key={i}>
              <span className="tag-word inline-block">{w}</span>{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
