import { useState, useEffect, useMemo, useRef } from 'react'
import Navbar from './components/Navbar'
import HeroCarousel from './components/HeroCarousel'
import RoomsSection from './components/RoomsSection'
import RegisterForm from './components/RegisterForm'
import UsersSection from './components/UsersSection'
import Footer from './components/Footer'
import { AlertModal, ConfirmModal, SuccessModal } from './components/Modal'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

export default function App() {
  /* ---- Form state ---- */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomType: '',
  })

  /* ---- Persisted users ---- */
  const [users, setUsers] = useLocalStorage('hotel-users', [])

  /* ---- Modal state ---- */
  const [pendingUser, setPendingUser] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  /* ---- Filter ---- */
  const [filterRoom, setFilterRoom] = useState('All')

  /* ---- Refs ---- */
  const nameRef = useRef(null)

  // Focus name input on first load
  useEffect(() => {
    if (nameRef.current) nameRef.current.focus()
  }, [])

  // Auto-close success modal after 2s, re-focus name
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false)
        if (nameRef.current) nameRef.current.focus()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  /* ---- Handlers ---- */
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleApply = () => {
    const { name, email, phone, roomType } = formData
    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !roomType ||
      roomType === 'Choose...'
    ) {
      setShowAlert(true)
      return
    }

    setPendingUser({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      roomType,
    })
    setShowConfirm(true)
  }

  const handleConfirm = () => {
    if (!pendingUser) return
    setUsers((prev) => [...prev, pendingUser])
    setPendingUser(null)
    setShowConfirm(false)
    setShowSuccess(true)
    setFormData({ name: '', email: '', phone: '', roomType: '' })
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

  /* ---- Render ---- */
  return (
    <>
      <Navbar />
      <main>
        <HeroCarousel />
        <RoomsSection />
        <RegisterForm
          formData={formData}
          onChange={handleChange}
          onApply={handleApply}
          nameRef={nameRef}
        />
        <UsersSection
          users={users}
          filteredUsers={filteredUsers}
          filterRoom={filterRoom}
          onFilterChange={setFilterRoom}
          stats={stats}
        />
      </main>
      <Footer />

      {/* Modals */}
      <AlertModal show={showAlert} onClose={() => setShowAlert(false)} />
      <ConfirmModal
        show={showConfirm}
        pendingUser={pendingUser}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
      />
      <SuccessModal
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </>
  )
}
