import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import './Navbar.css'

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <nav className="phoenix-navbar" id="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand */}
          <Link className="navbar-brand" to="/">
            <span className="brand-icon">🏨</span>
            Hotel Phoenix
          </Link>

          {/* Mobile toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="toggler-bar"></span>
            <span className="toggler-bar"></span>
            <span className="toggler-bar"></span>
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/book">Book Room</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/bookings">Previous Bookings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>

            {/* Theme Toggle */}
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <span className="theme-icon">{theme === 'light' ? '☀️' : '🌙'}</span>
              <span className="theme-label">{theme === 'light' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
