import { Link } from 'react-router-dom'
import HeroCarousel from '../components/HeroCarousel'
import RoomsSection from '../components/RoomsSection'

export default function Home() {
  return (
    <div className="home-page">
      <HeroCarousel />
      
      {/* Modern CTA Buttons Section */}
      <section className="section-padding cta-section text-center" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <h3 className="mb-4">Ready for an Unforgettable Stay?</h3>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/book" className="btn-phoenix btn-apply">Book Now</Link>
            <Link to="/bookings" className="btn-phoenix btn-outline">View Your Bookings</Link>
          </div>
        </div>
      </section>

      <RoomsSection />
    </div>
  )
}
