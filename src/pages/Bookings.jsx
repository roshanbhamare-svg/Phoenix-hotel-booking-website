import { useState, useMemo } from 'react'
import UsersSection from '../components/UsersSection'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Bookings() {
  /* ---- Persisted users ---- */
  const [users, setUsers] = useLocalStorage('hotel-users', [])
  
  /* ---- Filter ---- */
  const [filterRoom, setFilterRoom] = useState('All')

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const updatedUsers = users.filter((u) => u.id !== id);
      // Fallback if users don't have an ID (from old data)
      if (updatedUsers.length === users.length) {
         // Attempt delete by combination if old
      }
      setUsers(users.filter((u, index) => u.id ? u.id !== id : index !== id));
    }
  }

  /* ---- Derived state ---- */
  const filteredUsers =
    filterRoom === 'All'
      ? users
      : users.filter(
          (u) => u.roomType.toLowerCase() === filterRoom.toLowerCase()
        )

  const stats = useMemo(() => {
    const total = users.length
    const byRoom = users.reduce((acc, user) => {
      acc[user.roomType] = (acc[user.roomType] || 0) + 1
      return acc
    }, {})
    return { total, byRoom }
  }, [users])

  return (
    <div className="bookings-page">
      <UsersSection
        users={users}
        filteredUsers={filteredUsers}
        filterRoom={filterRoom}
        onFilterChange={setFilterRoom}
        stats={stats}
        onDelete={handleDelete}
      />
    </div>
  )
}
