import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { roomTypes } from '../data/constants'
import { createBooking } from '../services/api'
import './Booking.css'

export default function BookRoom() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    roomType: 'Deluxe',
    guests: 1,
    checkInDate: '',
    checkOutDate: '',
    specialRequest: ''
  })
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  
  const getSelectedRoomPrice = () => {
    if (formData.roomType === 'Deluxe') return 8500
    if (formData.roomType === 'Suite') return 14000
    if (formData.roomType === 'Presidential') return 28000
    return 5000 // Standard
  }
  
  const calculateDays = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 1
    const inDate = new Date(formData.checkInDate)
    const outDate = new Date(formData.checkOutDate)
    const diffTime = outDate - inDate
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 1
  }
  
  const totalPrice = getSelectedRoomPrice() * calculateDays()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.checkInDate || !formData.checkOutDate) {
      toast.error('Please select both check-in and check-out dates')
      return
    }
    
    setLoading(true)
    
    try {
      const response = await createBooking(formData)
      console.log('Booking success:', response.data)
      toast.success('✨ Booking successful! Your stay is confirmed.')
      navigate('/bookings')
    } catch (error) {
      console.error('Booking failed details:', error)
      const errorMsg = error.response?.data?.message || error.message || 'Server connection failed'
      toast.error(`❌ Booking failed: ${errorMsg}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section-padding booking-page">
      <div className="container">
        <h2 className="section-title text-center">Book Your Stay</h2>
        <div className="section-divider" />
        <p className="section-subtitle text-center">
          Choose your dates and reserve your perfect room
        </p>

        <div className="booking-layout mt-5">
          <div className="booking-form-pane">
            <div className="phoenix-card p-4">
              <form className="register-form" onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 form-group">
                    <label className="phoenix-label">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      className="phoenix-input"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="col-md-6 form-group">
                    <label className="phoenix-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="phoenix-input"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@mail.com"
                      required
                    />
                  </div>

                  <div className="col-md-6 form-group">
                    <label className="phoenix-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="phoenix-input"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 12345 67890"
                      required
                    />
                  </div>
                  
                  <div className="col-md-6 form-group">
                    <label className="phoenix-label">Room Type</label>
                    <select
                      name="roomType"
                      className="phoenix-input"
                      value={formData.roomType}
                      onChange={handleChange}
                    >
                      {roomTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-md-6 form-group">
                    <label className="phoenix-label">Number of Guests</label>
                    <input
                      type="number"
                      name="guests"
                      className="phoenix-input"
                      min="1" max="6"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6 form-group">
                    <label className="phoenix-label">Check-In Date</label>
                    <input
                      type="date"
                      name="checkInDate"
                      className="phoenix-input"
                      value={formData.checkInDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6 form-group">
                    <label className="phoenix-label">Check-Out Date</label>
                    <input
                      type="date"
                      name="checkOutDate"
                      className="phoenix-input"
                      value={formData.checkOutDate}
                      onChange={handleChange}
                      min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div className="col-12 form-group">
                    <label className="phoenix-label">Special Requests (Optional)</label>
                    <textarea
                      name="specialRequest"
                      className="phoenix-input"
                      rows="3"
                      value={formData.specialRequest}
                      onChange={handleChange}
                      placeholder="Any specific needs?"
                    />
                  </div>
                </div>
                
                <div className="form-action text-center mt-4">
                  <button type="submit" className="btn-phoenix btn-apply w-100" disabled={loading}>
                    {loading ? 'Processing...' : '✨ Confirm Booking'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="booking-summary-pane">
            <div className="phoenix-card p-4">
              <h4 className="mb-4">Price Summary</h4>
              <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
                <span>Room Type</span>
                <span>{formData.roomType}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
                <span>Room Base Price</span>
                <span>₹{getSelectedRoomPrice().toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
                <span>Nights</span>
                <span>× {calculateDays()}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold fs-5 mt-4 pt-2 border-top">
                <span>Total Amount</span>
                <span style={{color: 'var(--color-primary)'}}>₹{totalPrice.toLocaleString()}</span>
              </div>
              <p className="small text-muted mt-3">
                * Final price calculated on backend. Taxes may apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
