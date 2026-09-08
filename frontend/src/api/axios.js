import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
})

// ── Attach JWT token to every request automatically ──
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('furnihub_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── If token expired/invalid, clear session ──
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('furnihub_token')
      localStorage.removeItem('furnihub_user')
    }
    return Promise.reject(error)
  }
)

export default api;