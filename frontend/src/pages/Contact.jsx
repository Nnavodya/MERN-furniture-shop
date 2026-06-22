import React, { useState } from 'react'
import { TbMapPin, TbPhone, TbMail, TbClock, TbSend } from 'react-icons/tb'

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

const contactInfo = [
  { icon: TbMapPin, title: 'Visit Us',   lines: ['Colombo, Sri Lanka']            },
  { icon: TbPhone,  title: 'Call Us',    lines: ['+94 71 234 5678']               },
  { icon: TbMail,   title: 'Email Us',   lines: ['support@furnihub.com']         },
  { icon: TbClock,  title: 'Store Hours',lines: ['Mon–Sat: 9am–7pm', 'Sun: Closed'] },
]

const Field = ({ label, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold" style={{ color: C.text }}>{label}</label>
    <input
      {...props}
      className="px-3 py-2.5 rounded-lg text-sm outline-none"
      style={{ border: `1px solid ${C.accentBorder}`, background: C.card, color: C.text }}
    />
  </div>
)

const Contact = () => {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent]       = useState(false)
  const [sending, setSending] = useState(false)

  const valid = form.name && form.email && form.message

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!valid) return
    setSending(true)
    // ── Simulated submission — replace with POST /api/contact once backend is ready ──
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 900)
  }

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-12">

        {/* ── Header ── */}
        <div className="text-center mb-10 max-w-xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: C.accent }}>
            Get In Touch
          </p>
          <h1 className="text-3xl font-bold mb-3" style={{ color: C.text }}>
            We'd love to hear from you
          </h1>
          <p className="text-sm" style={{ color: C.textMuted }}>
            Questions about an order, a product, or anything else — our team usually replies within one business day.
          </p>
        </div>

        {/* ── Info cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          {contactInfo.map(({ icon: Icon, title, lines }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center p-5 rounded-xl"
              style={{ background: C.card, border: `1px solid ${C.divider}` }}
            >
              <div
                className="flex items-center justify-center h-10 w-10 rounded-xl mb-3"
                style={{ background: C.accentLight, border: `1px solid ${C.accentBorder}` }}
              >
                <Icon className="h-5 w-5" style={{ color: C.accent }} />
              </div>
              <p className="text-xs font-bold mb-1" style={{ color: C.text }}>{title}</p>
              {lines.map(line => (
                <p key={line} className="text-xs" style={{ color: C.textMuted }}>{line}</p>
              ))}
            </div>
          ))}
        </div>

        {/* ── Contact form ── */}
        <div className="max-w-2xl mx-auto rounded-2xl p-8" style={{ background: C.card, border: `1px solid ${C.divider}` }}>
          {sent ? (
            <div className="text-center py-8">
              <p className="text-2xl mb-3">✅</p>
              <h2 className="text-lg font-bold mb-1" style={{ color: C.text }}>Message sent!</h2>
              <p className="text-sm" style={{ color: C.textMuted }}>
                Thanks for reaching out — we'll get back to you soon.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-5 text-sm font-semibold"
                style={{ color: C.accent }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Your Name" placeholder="Nethmi Rajapaksha"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <Field
                  label="Email Address" type="email" placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <Field
                label="Subject" placeholder="Order inquiry, product question, etc."
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: C.text }}>Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
                  style={{ border: `1px solid ${C.accentBorder}`, background: C.card, color: C.text }}
                />
              </div>

              <button
                type="submit"
                disabled={!valid || sending}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all mt-2"
                style={{
                  background: valid ? C.accent : C.divider,
                  color: '#FFFFFF',
                  cursor: valid ? 'pointer' : 'not-allowed',
                  opacity: sending ? 0.7 : 1,
                }}
              >
                <TbSend className="h-4 w-4" />
                {sending ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact;