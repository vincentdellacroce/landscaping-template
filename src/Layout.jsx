import { useState, useCallback, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import MobileCall from './components/MobileCall.jsx'
import CallModal from './components/CallModal.jsx'

export default function Layout() {
  const [callOpen, setCallOpen] = useState(false)
  const openCall = useCallback(() => setCallOpen(true), [])
  const closeCall = useCallback(() => setCallOpen(false), [])
  const { pathname, hash } = useLocation()

  // Reset scroll on route change (or jump to a hash target when present).
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  // Reveal-on-scroll for every .reveal element — re-runs on each route so
  // freshly mounted page content animates in too.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.in)'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`
      io.observe(el)
    })
    return () => io.disconnect()
  }, [pathname])

  return (
    <>
      <Header onCall={openCall} />
      <Outlet context={{ onCall: openCall }} />
      <Footer onCall={openCall} />
      <MobileCall onCall={openCall} />
      <CallModal open={callOpen} onClose={closeCall} />
    </>
  )
}
