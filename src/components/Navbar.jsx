import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import './Navbar.css'

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <nav className="phoenix-navbar" id="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand */}
          <a className="navbar-brand" href="#hero">
            <span className="brand-icon">🏨</span>
            Hotel Phoenix
          </a>

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
                <a className="nav-link" href="#hero">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#rooms">Rooms</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#register">Book</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#users">Guests</a>
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
