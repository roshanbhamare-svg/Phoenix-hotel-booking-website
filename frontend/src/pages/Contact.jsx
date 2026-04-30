import './Contact.css'

export default function Contact() {
  return (
    <section className="section-padding contact-page">
      <div className="container">
        <h2 className="section-title text-center">Contact Us</h2>
        <div className="section-divider" />
        <p className="text-center section-subtitle">We would love to hear from you</p>
        
        <div className="row g-4 mt-4">
          <div className="col-lg-5">
            <div className="phoenix-card p-4 h-100">
              <h4 className="mb-4">Get in Touch</h4>
              <div className="contact-info-item d-flex align-items-center mb-4">
                <span className="contact-icon me-3">📍</span>
                <div>
                  <strong>Address</strong>
                  <p className="mb-0 text-muted">123 Phoenix Avenue, Pune, India 411001</p>
                </div>
              </div>
              <div className="contact-info-item d-flex align-items-center mb-4">
                <span className="contact-icon me-3">📞</span>
                <div>
                  <strong>Phone</strong>
                  <p className="mb-0 text-muted">+91 (800) 123-4567</p>
                </div>
              </div>
              <div className="contact-info-item d-flex align-items-center mb-4">
                <span className="contact-icon me-3">✉️</span>
                <div>
                  <strong>Email</strong>
                  <p className="mb-0 text-muted">reservations@hotelphoenix.com</p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="map-placeholder mt-4 rounded d-flex justify-content-center align-items-center" style={{ height: '200px', backgroundColor: 'var(--color-bg-tertiary)' }}>
                <span className="text-muted">Interactive Map Coming Soon 🗺️</span>
              </div>
            </div>
          </div>
          
          <div className="col-lg-7">
            <form className="phoenix-card p-4 h-100 register-form" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
              <h4 className="mb-4">Send us a Message</h4>
              <div className="row g-3">
                <div className="col-md-6 form-group">
                  <label className="phoenix-label">Your Name</label>
                  <input type="text" className="phoenix-input" placeholder="John Doe" required />
                </div>
                <div className="col-md-6 form-group">
                  <label className="phoenix-label">Your Email</label>
                  <input type="email" className="phoenix-input" placeholder="john@example.com" required />
                </div>
                <div className="col-12 form-group">
                  <label className="phoenix-label">Subject</label>
                  <input type="text" className="phoenix-input" placeholder="How can we help you?" required />
                </div>
                <div className="col-12 form-group mt-2">
                  <label className="phoenix-label">Message</label>
                  <textarea className="phoenix-input" rows="5" placeholder="Type your message here..." required></textarea>
                </div>
                <div className="col-12 mt-4 text-end">
                  <button type="submit" className="btn-phoenix btn-apply">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
