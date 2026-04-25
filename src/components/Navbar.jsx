import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import './Navbar.css'

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext)

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

            <Link className="nav-link contact-btn" to="/contact">
              Contact
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}