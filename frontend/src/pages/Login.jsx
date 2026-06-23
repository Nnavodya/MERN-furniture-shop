import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { TbMail, TbLock, TbEye, TbEyeOff, TbArrowRight } from 'react-icons/tb'
import { useAuth } from '../context/AuthContext'

const C = {
  bg:           '#FAF7F4',
  card:         '#FFFFFF',
  accent:       '#8B5E2E',
  accentLight:  'rgba(139,94,46,0.08)',
  accentBorder: 'rgba(139,94,46,0.18)',
  text:         '#2C1A0E',
  textMuted:    'rgba(44,26,14,0.55)',
  divider:      'rgba(139,94,46,0.12)',
}

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/'

  const [form, setForm]         = useState({ email: '', password: '' })
  const [showPw, setShowPw]     = useState(false)
  const [error, setError]       = useState('')
  const [submitting, setSubmitting] = useState(false)

  const valid = form.email && form.password

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!valid) return
    setError('')
    setSubmitting(true)

    // ── Simulated delay — replace with real API call once backend is ready ──
    setTimeout(() => {
      const result = login(form)
      setSubmitting(false)
      if (result.success) {
        navigate(redirectTo, { replace: true })
      } else {
        setError(result.error)
      }
    }, 500)
  }

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: C.text }}>Welcome back</h1>
            <p className="text-sm" style={{ color: C.textMuted }}>
              Log in to continue shopping at FurniHub
            </p>
          </div>

          <div className="rounded-2xl p-8" style={{ background: C.card, border: `1px solid ${C.divider}` }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {error && (
                <div
                  className="text-xs px-3 py-2.5 rounded-lg"
                  style={{ background: 'rgba(229,57,53,0.08)', color: '#E53935', border: '1px solid rgba(229,57,53,0.2)' }}
                >
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: C.text }}>Email</label>
                <div
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
                  style={{ border: `1px solid ${C.accentBorder}` }}
                >
                  <TbMail className="h-4 w-4 shrink-0" style={{ color: C.accent }} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="bg-transparent border-none outline-none text-sm w-full"
                    style={{ color: C.text }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold" style={{ color: C.text }}>Password</label>
                  <Link to="/forgot-password" className="text-xs font-medium" style={{ color: C.accent }}>
                    Forgot password?
                  </Link>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
                  style={{ border: `1px solid ${C.accentBorder}` }}
                >
                  <TbLock className="h-4 w-4 shrink-0" style={{ color: C.accent }} />
                  <input
                    type={showPw ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="bg-transparent border-none outline-none text-sm w-full"
                    style={{ color: C.text }}
                  />
                  <button type="button" onClick={() => setShowPw(s => !s)} style={{ color: C.textMuted }}>
                    {showPw ? <TbEyeOff className="h-4 w-4" /> : <TbEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={!valid || submitting}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all mt-2"
                style={{
                  background: valid ? C.accent : C.divider,
                  color: '#FFFFFF',
                  cursor: valid ? 'pointer' : 'not-allowed',
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? 'Logging in…' : 'Log In'} <TbArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          <p className="text-center text-sm mt-6" style={{ color: C.textMuted }}>
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold" style={{ color: C.accent }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;