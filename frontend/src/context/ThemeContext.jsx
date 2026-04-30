import { createContext, useState, useEffect, useMemo } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('hotel-theme') || 'light'
    } catch {
      return 'light'
    }
  })

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark')
    try {
      localStorage.setItem('hotel-theme', theme)
    } catch { /* ignore */ }
  }, [theme])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
