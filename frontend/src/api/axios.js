import axios from 'axios'

// ── Base URL — set VITE_API_URL in frontend/.env (falls back to local dev backend) ──
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// ── Attach JWT token to every request automatically, if one exists ──
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('furnihub_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── If the backend ever returns 401 (expired/invalid token), clear the session ──
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