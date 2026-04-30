import { useState, useEffect } from 'react'

/**
 * Custom hook: syncs state with localStorage.
 * @param {string} key   localStorage key
 * @param {*} initialValue  default value
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch (err) {
      console.warn('Error reading localStorage', err)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.warn('Error writing localStorage', err)
    }
  }, [key, value])

  return [value, setValue]
}
