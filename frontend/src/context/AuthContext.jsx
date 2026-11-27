/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react'
import api from '../api/axios'

export const AuthContext = createContext()

// Convenience hook — other files: const { user, login, logout } = useAuth()
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('furnihub_user')
    const savedToken = localStorage.getItem('furnihub_token')
    if (savedUser && savedToken) {
      try {
        return JSON.parse(savedUser)
      } catch (err) {
        console.error('Failed to load user session:', err)
      }
    }
    return null
  })
  const loading = false

  const persistSession = (data) => {
    const sessionUser = { id: data._id, name: data.name, email: data.email, role: data.role }
    localStorage.setItem('furnihub_token', data.token)
    localStorage.setItem('furnihub_user', JSON.stringify(sessionUser))
    setUser(sessionUser)
    return sessionUser
  }

  // ── Signup — POST /api/auth/signup ──
  const signup = async ({ name, email, password }) => {
    try {
      const { data } = await api.post('/auth/signup', { name, email, password })
      persistSession(data)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || 'Signup failed. Please try again.',
      }
    }
  }

  // ── Login — POST /api/auth/login ──
  const login = async ({ email, password }) => {
    try {
      const { data } = await api.post('/auth/login', { email, password })
      persistSession(data)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || 'Invalid email or password.',
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('furnihub_token')
    localStorage.removeItem('furnihub_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  )
}