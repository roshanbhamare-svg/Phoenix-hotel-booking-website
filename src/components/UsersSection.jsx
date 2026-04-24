import { roomTypes } from '../data/constants'
import './UsersSection.css'

export default function UsersSection({
  users,
  filteredUsers,
  filterRoom,
  onFilterChange,
  stats,
}) {
  return (
    <section id="users" className="section-padding">
      <div className="container">
        <h2 className="section-title">Registered Guests</h2>
        <div className="section-divider" />
        <p className="section-subtitle">
          Overview of all confirmed bookings
        </p>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Bookings</div>
          </div>
          {roomTypes.map((type) => (
            <div className="stat-card" key={type}>
              <div className="stat-number">{stats.byRoom[type] || 0}</div>
              <div className="stat-label">{type}</div>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <span className="filter-info">
            Showing <strong>{filteredUsers.length}</strong> of{' '}
            <strong>{users.length}</strong> guests
          </span>
          <div className="filter-control">
            <label htmlFor="filterRoom" className="filter-label">
              Filter by Room:
            </label>
            <select
              id="filterRoom"
              className="phoenix-input filter-select"
              value={filterRoom}
              onChange={(e) => onFilterChange(e.target.value)}
            >
              <option>All</option>
              {roomTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrap">
          <table className="phoenix-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Room Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    <div className="empty-icon">📋</div>
                    <div>No guests registered yet.</div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <span
                        className={`room-badge ${user.roomType.toLowerCase()}`}
                      >
                        {user.roomType}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
