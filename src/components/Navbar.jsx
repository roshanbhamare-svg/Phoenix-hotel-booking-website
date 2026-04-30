import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'
import { useState } from 'react'
import './Navbar.css'

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { user, logout } = useAuth()
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  return (
    <nav className="phoenix-navbar">
      <div className="container">
        <div className="navbar-inner">

          {/* LEFT : BRAND */}
          <Link className="navbar-brand" to="/">
            <span className="brand-icon">🏨</span>
            Hotel Phoenix
          </Link>

          {/* RIGHT : MENU */}
          <div className="navbar-menu ">
            <Link className="nav-link" to="/book">
              Bookings
            </Link>

            <Link className="nav-link" to="/bookings">
              Previous Bookings
            </Link>

            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
            >
              <span className="theme-icon">
                {theme === 'light' ? '🌙' : '☀️'}
              </span>

              <span className="theme-label">
                {theme === 'light' ? 'Dark' : 'Light'}
              </span>
            </button>

            {user ? (
              <button className="nav-link contact-btn border-0" onClick={logout}>
                Logout
              </button>
            ) : (
              <button className="nav-link contact-btn border-0" onClick={() => setIsAuthOpen(true)}>
                Login
              </button>
            )}
          </div>

        </div>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </nav>
  )
}