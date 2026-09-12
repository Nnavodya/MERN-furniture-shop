import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// ── Redirects to /login if not authenticated
// ── Redirects to / if authenticated but not admin
const AdminRoute = ({ children }) => {
  const { loading, isAuthenticated, isAdmin } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: '#1A1008' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Loading…</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: '/admin/dashboard' }} replace />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute;