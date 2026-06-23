import React, { createContext, useState, useEffect, useContext } from 'react'

export const AuthContext = createContext()

// Convenience hook — other files: const { user, login, logout } = useAuth()
export const useAuth = () => useContext(AuthContext)

// ── Mock "users table" — backend ready වෙද්දී real API call එකකින් replace කරන්න ──
const MOCK_USERS_KEY = 'furnihub_users'

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  // ── Restore session from localStorage on mount ──
  useEffect(() => {
    const saved = localStorage.getItem('furnihub_user')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch (err) {
        console.error('Failed to load user session:', err)
      }
    }
    setLoading(false)
  }, [])

  const getMockUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(MOCK_USERS_KEY)) || []
    } catch {
      return []
    }
  }

  // ── Signup — mock only. Replace with POST /api/auth/signup once backend is ready ──
  const signup = ({ name, email, password }) => {
    const users = getMockUsers()
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (exists) {
      return { success: false, error: 'An account with this email already exists.' }
    }

    const newUser = { id: Date.now(), name, email, password }
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify([...users, newUser]))

    const sessionUser = { id: newUser.id, name, email }
    localStorage.setItem('furnihub_user', JSON.stringify(sessionUser))
    setUser(sessionUser)

    return { success: true }
  }

  // ── Login — mock only. Replace with POST /api/auth/login once backend is ready ──
  const login = ({ email, password }) => {
    const users = getMockUsers()
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) {
      return { success: false, error: 'Invalid email or password.' }
    }

    const sessionUser = { id: found.id, name: found.name, email: found.email }
    localStorage.setItem('furnihub_user', JSON.stringify(sessionUser))
    setUser(sessionUser)

    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('furnihub_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}