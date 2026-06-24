import { useState } from 'react'
import { PHONE, PHONE_TEL, EMAIL } from '../App.jsx'

// === FORM DELIVERY ==========================================================
// Get a free access key at https://web3forms.com (enter the email where you want
// quote requests to land, e.g. hello@example.com) and paste it
// below. Submissions then arrive in that inbox automatically — no server needed.
// Until a real key is set, the form falls back to opening the visitor's email app.
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'
// ============================================================================

export default function Contact({ onCall, defaultTown = 'Town One' }) {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)

    // Fallback: no key configured yet -> open the visitor's email client.
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.startsWith('YOUR_')) {
      const subject = encodeURIComponent(`Quote Request — ${data.get('service')} (${data.get('town')})`)
      const body = encodeURIComponent(
        `Name: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')}\n` +
          `Service: ${data.get('service')}\nTown: ${data.get('town')}\n\nProject details:\n${data.get('message')}`
      )
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
      return
    }

    data.append('access_key', WEB3FORMS_ACCESS_KEY)
    data.append('subject', `New quote request — ${data.get('service')} (${data.get('town')})`)
    data.append('from_name', 'Your Company Landscaping Website')

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact section-pad" id="quote"><div className="wrap contact-grid">
      <div className="reveal">
        <span className="eyebrow">Get In Touch</span>
        <h2>Request a free quote.</h2>
        <p className="contact-lead">Send the details and we'll get you a free estimate — usually within a business day. Rather talk it through? Call or email anytime.</p>
        <div className="contact-methods">
          <button className="cm" onClick={onCall}><span className="ci"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1z"/></svg></span><div><span>Call or Text</span><b>{PHONE}</b></div></button>
          <a className="cm" href={`mailto:${EMAIL}`}><span className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></span><div><span>Email Us</span><b>{EMAIL}</b></div></a>
          <div className="cm"><span className="ci"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg></span><div><span>Service Area</span><b>Your Town &amp; Your Area</b></div></div>
        </div>
      </div>

      <form className="quote reveal" onSubmit={handleSubmit}>
        {status === 'success' ? (
          <div className="form-success">
            <div className="ok-ic">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" /></svg>
            </div>
            <h3>Thanks — we got it.</h3>
            <p>Your request is on its way. We'll be in touch within one business day. Need us sooner? Call <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>.</p>
          </div>
        ) : (
          <>
            <h3>Tell us about your project</h3>
            <p className="fhint">We'll get back to you within one business day.</p>
            {/* honeypot (spam trap — bots fill this, humans never see it) */}
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />
            <div className="frow">
              <div className="field"><label htmlFor="name">Full Name</label><input id="name" name="name" type="text" autoComplete="name" required placeholder="Jane Smith" /></div>
              <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" required placeholder="(555) 555-0123" /></div>
            </div>
            <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@email.com" /></div>
            <div className="frow">
              <div className="field"><label htmlFor="service">Service Needed</label>
                <select id="service" name="service" defaultValue="Maintenance">
                  <option>Maintenance</option><option>Spring &amp; Fall Cleanup</option><option>Sod Installation</option><option>Mulch &amp; Beds</option><option>Patios &amp; Walkways</option><option>Driveways</option><option>Pools</option><option>Landscape Installation</option><option>Snow Removal</option><option>Other / Multiple</option>
                </select>
              </div>
              <div className="field"><label htmlFor="town">Your Town</label>
                <select id="town" name="town" defaultValue={defaultTown}>
                  <option>Town One</option><option>Town Two</option><option>Town Three</option><option>Town Four</option><option>Town Five</option><option>Town Six</option><option>Other</option>
                </select>
              </div>
            </div>
            <div className="field"><label htmlFor="message">Project Details</label><textarea id="message" name="message" placeholder="Tell us a bit about what you need..."></textarea></div>
            {status === 'error' && (
              <p className="form-error">Sorry — that didn't send. Please call <a href={`tel:${PHONE_TEL}`}>{PHONE}</a> or email us directly.</p>
            )}
            <button className="btn btn-gold" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send My Request'}
            </button>
            <p className="form-foot">Prefer to call? <button type="button" onClick={onCall} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#a9842c', fontWeight: 600 }}>{PHONE}</button></p>
          </>
        )}
      </form>
    </div></section>
  )
}
