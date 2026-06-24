import LogoMark from './LogoMark.jsx'
import { PHONE, PHONE_TEL, EMAIL } from '../App.jsx'

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <a className="brand" href="#top"><LogoMark size={40} /><span className="bname"><b>YOUR COMPANY</b><span>Landscaping &amp; Construction</span></span></a>
          <p>Landscaping, hardscaping, and snow removal for Your Area homeowners. Years of experience, one local crew.</p>
        </div>
        <div className="foot-col">
          <h4>Services</h4>
          <a href="#services">Maintenance</a>
          <a href="#services">Patios &amp; Walkways</a>
          <a href="#services">Landscape Installation</a>
          <a href="#services">Snow Removal</a>
        </div>
        <div className="foot-col">
          <h4>Contact</h4>
          <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <p>Town One · Town Two · Town Three<br />Town Four · Town Five · Town Six</p>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>© {new Date().getFullYear()} Your Company Landscaping and Construction. All rights reserved.</span>
        <span>Serving Your Area</span>
      </div>
    </footer>
  )
}
