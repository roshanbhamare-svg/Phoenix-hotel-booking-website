import axios from 'axios'

const API_URL = 'http://localhost:8081/api'

const api = axios.create({
  baseURL: API_URL,
})

export const createBooking = (data) => api.post('/bookings', data)
export const getAllBookings = () => api.get('/bookings')
export const cancelBooking = (id) => api.delete(`/bookings/${id}`)

export default api
