import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { getAllBookings, cancelBooking } from '../services/api'
import './Dashboard.css'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterRoom, setFilterRoom] = useState('All')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const response = await getAllBookings()
      setBookings(response.data)
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
      toast.error('Failed to load bookings history')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (id) => {
    if(!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await cancelBooking(id)
      toast.success('Booking cancelled successfully')
      fetchBookings() // Refresh the list
    } catch (error) {
      console.error('Cancellation failed:', error)
      toast.error('Failed to cancel booking')
    }
  }

  const filteredBookings = filterRoom === 'All' 
    ? bookings 
    : bookings.filter(b => b.roomType === filterRoom)

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Retrieving your bookings...</p>
      </div>
    )
  }

  return (
    <section className="section-padding dashboard-page">
      <div className="container">
        <h2 className="section-title text-center">Previous Bookings</h2>
        <div className="section-divider" />
        <p className="section-subtitle text-center">
          Manage your stay history and active reservations (Database Connected)
        </p>
        
        {/* Stats Row */}
        <div className="admin-stats-grid mb-5 mt-5">
          <div className="stat-card">
            <div className="stat-number">{bookings.length}</div>
            <div className="stat-label">Total Bookings</div>
          </div>
          <div className="stat-card">
            <div className="stat-number text-primary">
              ₹{bookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0).toLocaleString()}
            </div>
            <div className="stat-label">Spendings</div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="phoenix-card p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="m-0">Your Reservation History</h4>
            <select 
              className="phoenix-input" 
              style={{ width: 'auto'}} 
              value={filterRoom} 
              onChange={e => setFilterRoom(e.target.value)}
            >
              <option value="All">All Room Types</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
              <option value="Presidential">Presidential</option>
              <option value="Standard">Standard</option>
            </select>
          </div>

          <div className="table-responsive">
            <table className="phoenix-table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Dates</th>
                  <th>Room</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                   <tr><td colSpan="6" className="text-center py-5">
                     <div className="text-muted">No reservations found in database.</div>
                     <small>Start by booking a room!</small>
                   </td></tr>
                ) : (
                  filteredBookings.map(b => (
                    <tr key={b.id}>
                      <td>
                        <strong>{b.fullName}</strong>
                        <div style={{fontSize: '0.85em', color: 'var(--color-text-muted)'}}>{b.email}</div>
                      </td>
                      <td style={{fontSize: '0.9em'}}>
                        {new Date(b.checkInDate).toLocaleDateString()} to<br/>
                        {new Date(b.checkOutDate).toLocaleDateString()}
                      </td>
                      <td><span className={`room-badge ${b.roomType.toLowerCase()}`}>{b.roomType}</span></td>
                      <td>₹{b.totalPrice.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${b.status === 'CONFIRMED' ? 'bg-success' : 'bg-danger'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td>
                        {b.status === 'CONFIRMED' && (
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleCancel(b.id)}>
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
