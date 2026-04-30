import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="phoenix-footer" id="footer">
      <div className="container">
        <div className="footer-inner">
          {/* Brand Column */}
          <div className="footer-brand">
            <h3 className="footer-logo">🏨 Hotel Phoenix</h3>
            <p className="footer-tagline">
              Where luxury meets serenity. Your perfect getaway awaits.
            </p>
          </div>

          {/* Contact Column */}
          <div className="footer-contact">
            <h5 className="footer-heading">Contact Us</h5>
            <ul className="footer-list">
              <li>📍 MG Road, Pune, Maharashtra, India</li>
              <li>📞 +91 20 1234 5678</li>
              <li>✉️ reservations@hotelphoenix.in</li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="footer-links">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-list">
              <li><a href="#hero">Home</a></li>
              <li><a href="#rooms">Rooms &amp; Suites</a></li>
              <li><a href="#register">Book a Room</a></li>
              <li><a href="#users">Guest List</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Hotel Phoenix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
