import React, { useState } from 'react'
import { TbPlus, TbMinus } from 'react-icons/tb'

const C = {
  bg:          '#FAF7F4',
  card:        '#FFFFFF',
  accent:      '#8B5E2E',
  accentLight: 'rgba(139,94,46,0.08)',
  text:        '#2C1A0E',
  textMuted:   'rgba(44,26,14,0.55)',
  divider:     'rgba(139,94,46,0.12)',
}

const faqs = [
  {
    q: 'How long does delivery take?',
    a: 'Standard delivery takes 3–7 business days. Express delivery (1–2 days) is available at checkout for an additional fee. Large items such as sofas and bed frames may require a scheduled delivery appointment.',
  },
  {
    q: 'Do you offer free delivery?',
    a: 'Yes! All orders over $100 qualify for free standard delivery. Orders under $100 incur a flat $25 shipping fee.',
  },
  {
    q: 'Can I return a product if I change my mind?',
    a: 'Absolutely. We offer a 30-day hassle-free return policy. Items must be unused, in their original packaging, and in resalable condition. Contact our support team to initiate a return.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order is dispatched, you will receive an email with a tracking number. You can also log in to your FurniHub account and visit the My Orders page to check your order status.',
  },
  {
    q: 'Are your products covered by a warranty?',
    a: 'Yes. All FurniHub furniture comes with a 2-year manufacturer\'s warranty covering defects in materials and workmanship. This does not cover normal wear and tear or accidental damage.',
  },
  {
    q: 'Can I cancel or modify my order?',
    a: 'Orders can be cancelled or modified within 24 hours of placement. After that, the order may already be in processing. Please contact us at support@furnihub.com as soon as possible.',
  },
  {
    q: 'Do you offer assembly services?',
    a: 'We offer white-glove delivery for selected items, which includes in-room placement and basic assembly. This service is available at checkout for eligible products.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Visa, Mastercard, American Express, and PayPal. We also offer Cash on Delivery (COD) for eligible orders. All online payments are SSL-encrypted.',
  },
]

const FAQ = () => {
  const [open, setOpen] = useState(null)

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-12 max-w-3xl">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: C.accent }}>
            Help Center
          </p>
          <h1 className="text-3xl font-bold mb-3" style={{ color: C.text }}>
            Frequently Asked Questions
          </h1>
          <p className="text-sm" style={{ color: C.textMuted }}>
            Can't find an answer? Email us at{' '}
            <a href="mailto:support@furnihub.com" style={{ color: C.accent }}>
              support@furnihub.com
            </a>
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden transition-all"
              style={{
                background: C.card,
                border: `1px solid ${open === i ? 'rgba(139,94,46,0.3)' : C.divider}`,
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold pr-4" style={{ color: C.text }}>
                  {faq.q}
                </span>
                {open === i
                  ? <TbMinus className="h-4 w-4 shrink-0" style={{ color: C.accent }} />
                  : <TbPlus  className="h-4 w-4 shrink-0" style={{ color: C.accent }} />
                }
              </button>

              {open === i && (
                <div
                  className="px-5 pb-4 text-sm leading-relaxed"
                  style={{ color: C.textMuted, borderTop: `1px solid ${C.divider}`, paddingTop: '12px' }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ;