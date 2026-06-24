import { useState, useEffect } from 'react'
import { PHONE, PHONE_TEL } from '../App.jsx'

export default function CallModal({ open, onClose }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const handleCopy = () => {
    navigator.clipboard?.writeText(PHONE)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div
      className={`call-overlay ${open ? 'open' : ''}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      <div className="call-card" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round"/></svg>
        </button>
        <div className="ring">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1z"/></svg>
        </div>
        <p className="lbl">Call Your Company</p>
        <p className="num"><a href={`tel:${PHONE_TEL}`}>{PHONE}</a></p>
        <p className="sub">Mon–Sat · Free estimates over the phone.</p>
        <div className="actions">
          <a className="btn btn-gold" href={`tel:${PHONE_TEL}`}>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1z"/></svg>
            {' '}Call Now
          </a>
          <button className="btn btn-outline" onClick={handleCopy}>{copied ? 'Copied!' : 'Copy Number'}</button>
        </div>
      </div>
    </div>
  )
}
