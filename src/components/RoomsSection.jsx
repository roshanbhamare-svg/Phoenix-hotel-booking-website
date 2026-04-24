import { roomsData } from '../data/constants'
import './RoomsSection.css'

export default function RoomsSection() {
  return (
    <section id="rooms" className="section-padding">
      <div className="container">
        <h2 className="section-title">Rooms &amp; Suites</h2>
        <div className="section-divider" />
        <p className="section-subtitle">
          Discover our handpicked collection of luxurious accommodations
        </p>

        <div className="rooms-grid">
          {roomsData.map((room, index) => (
            <div
              key={room.id}
              className={`phoenix-card room-card animate-in animate-delay-${index + 1}`}
            >
              <div className="room-img-wrap">
                <img
                  src={room.img}
                  alt={room.title}
                  className="room-img"
                  loading="lazy"
                />
                <div className="room-price-tag">{room.price}/night</div>
              </div>
              <div className="room-body">
                <h4 className="room-title">{room.title}</h4>
                <p className="room-desc">{room.description}</p>
                <div className="room-features">
                  <span className="feature-chip">🛏️ King Bed</span>
                  <span className="feature-chip">📶 Free Wi-Fi</span>
                  <span className="feature-chip">❄️ AC</span>
                </div>
                <a href="#register" className="btn-phoenix room-book-btn">
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
