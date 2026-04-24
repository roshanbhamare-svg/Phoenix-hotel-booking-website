import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'
import { AlertModal, ConfirmModal, SuccessModal } from '../components/Modal'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function BookRoom() {
  const navigate = useNavigate()
  
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

  /* ---- Refs ---- */
  const nameRef = useRef(null)

  // Focus name input on first load
  useEffect(() => {
    if (nameRef.current) nameRef.current.focus()
  }, [])

  // Auto-close success modal after 2s, redirect
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false)
        navigate('/bookings')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess, navigate])

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

    // Add ID so we can uniquely identify them for cancellation
    setPendingUser({
      id: Date.now().toString(),
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

  return (
    <div className="book-room-page">
      <RegisterForm
        formData={formData}
        onChange={handleChange}
        onApply={handleApply}
        nameRef={nameRef}
      />
      
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
    </div>
  )
}
