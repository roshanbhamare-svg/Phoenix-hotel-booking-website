import { createContext, useState, useEffect, useContext } from 'react'

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const storedUser = localStorage.getItem('hotel-user')
    const storedToken = localStorage.getItem('hotel-token')
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse stored user", e)
        localStorage.removeItem('hotel-user')
        localStorage.removeItem('hotel-token')
      }
    }
  }, [])
  
  const login = (userData) => {
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role
    })
    localStorage.setItem('hotel-user', JSON.stringify({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role
    }))
    localStorage.setItem('hotel-token', userData.token)
  }
  
  const logout = () => {
    setUser(null)
    localStorage.removeItem('hotel-user')
    localStorage.removeItem('hotel-token')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
