import { carouselSlides } from '../data/constants'
import './HeroCarousel.css'

export default function HeroCarousel() {
  return (
    <section id="hero" className="hero-section">
      <div
        id="hotelCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#hotelCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : undefined}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {carouselSlides.map((slide, index) => (
            <div
              key={slide.title}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <div className="hero-overlay" />
              <img
                src={slide.img}
                className="d-block w-100 hero-image"
                alt={slide.title}
              />
              <div className="carousel-caption hero-caption">
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-text">{slide.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#hotelCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#hotelCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  )
}
