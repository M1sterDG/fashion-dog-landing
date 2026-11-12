import { useEffect, useRef } from 'react'
import { PawPrint } from '@phosphor-icons/react'
import { tagline } from '../content.js'

// B11: cada palabra pasa de 30% de opacidad a 100% cuando cruza una línea de activación.
// IntersectionObserver por palabra, sin listener de scroll.
export default function Tagline() {
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
    <section id="lema" className="bg-orange-soft py-24">
      <div className="mx-auto w-full max-w-6xl px-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange" aria-hidden="true">
          <PawPrint size={28} weight="fill" />
        </span>
        <p ref={wrap} className="heading-4 md:heading-3 mt-6 max-w-[680px]">
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
