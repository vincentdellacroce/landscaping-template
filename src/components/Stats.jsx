import { useRef, useState, useEffect } from 'react'

export default function Stats() {
  const ref = useRef(null)
  const [cur, setCur] = useState({ x: 0, y: 0, on: false })

  useEffect(() => {
    const sec = ref.current
    if (!sec) return
    const move = (e) => setCur({ x: e.clientX, y: e.clientY, on: true })
    const leave = () => setCur((c) => ({ ...c, on: false }))
    sec.addEventListener('pointermove', move)
    sec.addEventListener('pointerleave', leave)
    return () => {
      sec.removeEventListener('pointermove', move)
      sec.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <section className="stats" ref={ref}>
      <div className="wrap">
        <div className="stat"><b>7</b><span>Years In Business</span></div>
        <div className="stat"><b>6</b><span>Towns Served</span></div>
        <div className="stat"><b>10+</b><span>Services</span></div>
        <div className="stat"><b>4-Season</b><span>Year-Round</span></div>
      </div>

      <div
        className={`stats-aura ${cur.on ? 'on' : ''}`}
        style={{ transform: `translate(${cur.x}px, ${cur.y}px) translate(-50%, -50%)` }}
        aria-hidden="true"
      />
    </section>
  )
}
