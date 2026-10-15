import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TbMail, TbArrowRight, TbChevronLeft, TbCircleCheck } from 'react-icons/tb'
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

const ForgotPassword = () => {
  const [email, setEmail]           = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent]             = useState(false)
  const [error, setError]           = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setError('')
    setSubmitting(true)
    try {
      await api.post('/auth/forgot-password', { email })
      setSent(true)
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
            <h1 className="text-2xl font-bold mb-2" style={{ color: C.text }}>Forgot your password?</h1>
            <p className="text-sm" style={{ color: C.textMuted }}>
              Enter your email and we'll send you a link to reset it.
            </p>
          </div>

          <div className="rounded-2xl p-8" style={{ background: C.card, border: `1px solid ${C.divider}` }}>
            {sent ? (
              <div className="flex flex-col items-center text-center gap-3">
                <TbCircleCheck className="h-12 w-12" style={{ color: '#2E7D32' }} />
                <p className="text-sm font-semibold" style={{ color: C.text }}>Check your inbox</p>
                <p className="text-sm" style={{ color: C.textMuted }}>
                  If an account exists for <strong>{email}</strong>, a reset link is on its way.
                  The link is valid for 15 minutes.
                </p>
              </div>
            ) : (
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
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="bg-transparent border-none outline-none text-sm w-full"
                      style={{ color: C.text }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!email || submitting}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all mt-2"
                  style={{
                    background: email ? C.accent : C.divider,
                    color: '#FFFFFF',
                    cursor: email ? 'pointer' : 'not-allowed',
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? 'Sending…' : 'Send Reset Link'} <TbArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          <p className="text-center text-sm mt-6">
            <Link to="/login" className="inline-flex items-center gap-1 font-semibold" style={{ color: C.accent }}>
              <TbChevronLeft className="h-4 w-4" /> Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;