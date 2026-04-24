import { roomTypes } from '../data/constants'
import './RegisterForm.css'

export default function RegisterForm({ formData, onChange, onApply, nameRef }) {
  return (
    <section id="register" className="section-padding">
      <div className="container">
        <h2 className="section-title">Book Your Stay</h2>
        <div className="section-divider" />
        <p className="section-subtitle">
          Fill in your details and reserve your perfect room
        </p>

        <div className="register-card">
          <form className="register-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-grid">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="name" className="phoenix-label">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="phoenix-input"
                  placeholder="e.g. John Doe"
                  required
                  ref={nameRef}
                  value={formData.name}
                  onChange={onChange}
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email" className="phoenix-label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="phoenix-input"
                  placeholder="e.g. john@example.com"
                  required
                  value={formData.email}
                  onChange={onChange}
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="phone" className="phoenix-label">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="phoenix-input"
                  placeholder="e.g. +91 98765 43210"
                  required
                  value={formData.phone}
                  onChange={onChange}
                />
              </div>

              {/* Room Type */}
              <div className="form-group">
                <label htmlFor="roomType" className="phoenix-label">
                  Room Type
                </label>
                <select
                  id="roomType"
                  className="phoenix-input"
                  required
                  value={formData.roomType || 'Choose...'}
                  onChange={onChange}
                >
                  <option disabled>Choose...</option>
                  {roomTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-action">
              <button
                type="button"
                className="btn-phoenix btn-apply"
                onClick={onApply}
              >
                ✨ Apply Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
