import { useEffect, useRef, useState } from 'react'

// Revela un elemento una sola vez al entrar al viewport (IntersectionObserver, sin scroll listener).
export function useRevealOnce() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, visible]
}

// Devuelve el id de la sección que cruza la franja central de la pantalla.
export function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

// true mientras alguno de los elementos con esos ids está a la vista.
export function useAnyInView(ids) {
  const [inView, setInView] = useState(true)
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const state = new Map()
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => state.set(e.target.id, e.isIntersecting))
      setInView([...state.values()].some(Boolean))
    })
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        state.set(id, false)
        io.observe(el)
      }
    })
    return () => io.disconnect()
  }, [ids])
  return inView
}

export const cn = (...parts) => parts.filter(Boolean).join(' ')
