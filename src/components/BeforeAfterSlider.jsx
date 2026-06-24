import { useRef, useState, useCallback } from 'react'
import './BeforeAfterSlider.css'

// Drag (or tap, or arrow-key) to wipe between the "before" and "after" images.
export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
  alt = 'Project',
}) {
  const ref = useRef(null)
  const draggingRef = useRef(false)
  const [pos, setPos] = useState(50)

  const update = useCallback((clientX) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, pct)))
  }, [])

  const onPointerDown = (e) => {
    draggingRef.current = true
    ref.current?.setPointerCapture?.(e.pointerId)
    update(e.clientX)
  }
  const onPointerMove = (e) => {
    if (draggingRef.current) update(e.clientX)
  }
  const stop = () => {
    draggingRef.current = false
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setPos((p) => Math.max(0, p - 2))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setPos((p) => Math.min(100, p + 2))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setPos(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setPos(100)
    }
  }

  return (
    <div
      className="ba"
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
    >
      {/* After image (bottom layer, full) */}
      <img className="ba-img" src={after} alt={`${alt} — after`} draggable="false" loading="lazy" decoding="async" />

      {/* Before image (top layer, clipped to the left of the handle) */}
      <div className="ba-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img className="ba-img" src={before} alt={`${alt} — before`} draggable="false" loading="lazy" decoding="async" />
      </div>

      <span className="ba-tag ba-tag-before">{beforeLabel}</span>
      <span className="ba-tag ba-tag-after">{afterLabel}</span>

      <div
        className="ba-divider"
        style={{ left: `${pos}%` }}
        role="slider"
        aria-label={`${alt}: drag to compare before and after`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div className="ba-handle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 7l-4 5 4 5M15 7l4 5-4 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
