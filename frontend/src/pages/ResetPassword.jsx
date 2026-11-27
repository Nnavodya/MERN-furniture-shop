import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TbLock, TbEye, TbEyeOff, TbArrowRight, TbCircleCheck } from 'react-icons/tb'
import api from '../api/axios'

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

const ResetPassword = () => {
  const { token } = useParams()
  const navigate  = useNavigate()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone]         = useState(false)
  const [error, setError]       = useState('')

  const mismatch = confirm && password !== confirm
  const valid    = password.length >= 6 && password === confirm

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!valid) return
    setError('')
    setSubmitting(true)
    try {
      await api.post(`/auth/reset-password/${token}`, { password })
      setDone(true)
      setTimeout(() => navigate('/login', { replace: true }), 2500)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: C.text }}>Set a new password</h1>
            <p className="text-sm" style={{ color: C.textMuted }}>Choose a password with at least 6 characters.</p>
          </div>

          <div className="rounded-2xl p-8" style={{ background: C.card, border: `1px solid ${C.divider}` }}>
            {done ? (
              <div className="flex flex-col items-center text-center gap-3">
                <TbCircleCheck className="h-12 w-12" style={{ color: '#2E7D32' }} />
                <p className="text-sm font-semibold" style={{ color: C.text }}>Password updated</p>
                <p className="text-sm" style={{ color: C.textMuted }}>Redirecting you to login…</p>
                <Link to="/login" className="text-sm font-semibold" style={{ color: C.accent }}>Go to login now</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                  <div
                    className="text-xs px-3 py-2.5 rounded-lg"
                    style={{ background: 'rgba(229,57,53,0.08)', color: '#E53935', border: '1px solid rgba(229,57,53,0.2)' }}
                  >
                    {error}{' '}
                    <Link to="/forgot-password" className="font-semibold underline">Request a new link</Link>
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: C.text }}>New password</label>
                  <div
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
                    style={{ border: `1px solid ${C.accentBorder}` }}
                  >
                    <TbLock className="h-4 w-4 shrink-0" style={{ color: C.accent }} />
                    <input
                      type={showPw ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="bg-transparent border-none outline-none text-sm w-full"
                      style={{ color: C.text }}
                    />
                    <button type="button" onClick={() => setShowPw(s => !s)} style={{ color: C.textMuted }}>
                      {showPw ? <TbEyeOff className="h-4 w-4" /> : <TbEye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: C.text }}>Confirm password</label>
                  <div
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
                    style={{ border: `1px solid ${mismatch ? '#E53935' : C.accentBorder}` }}
                  >
                    <TbLock className="h-4 w-4 shrink-0" style={{ color: C.accent }} />
                    <input
                      type={showPw ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                      className="bg-transparent border-none outline-none text-sm w-full"
                      style={{ color: C.text }}
                    />
                  </div>
                  {mismatch && <p className="text-xs" style={{ color: '#E53935' }}>Passwords don't match</p>}
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
                  {submitting ? 'Updating…' : 'Update Password'} <TbArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;