import React from 'react'
import { TbRefresh, TbShieldCheck, TbPackage, TbMail } from 'react-icons/tb'

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

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-bold mb-3" style={{ color: C.text }}>{title}</h2>
    <div className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{children}</div>
  </div>
)

const Returns = () => (
  <div style={{ background: C.bg, minHeight: '100vh' }}>
    <div className="container mx-auto px-4 py-12 max-w-3xl">

      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: C.accent }}>
          Returns
        </p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: C.text }}>Returns & Refunds</h1>
        <p className="text-sm" style={{ color: C.textMuted }}>Last updated: January 2026</p>
      </div>

      {/* Quick info cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { icon: TbRefresh,      title: '30-Day Returns', desc: 'Hassle-free'          },
          { icon: TbShieldCheck,  title: 'Full Refund',    desc: 'On eligible items'    },
          { icon: TbPackage,      title: 'Free Return',    desc: 'Defective items only' },
          { icon: TbMail,         title: 'Easy Process',   desc: 'Email to start'       },
        ].map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center p-4 rounded-xl"
            style={{ background: C.card, border: `1px solid ${C.divider}` }}
          >
            <div className="p-2 rounded-lg mb-2" style={{ background: C.accentLight }}>
              <Icon className="h-5 w-5" style={{ color: C.accent }} />
            </div>
            <p className="text-xs font-bold" style={{ color: C.text }}>{title}</p>
            <p className="text-xs" style={{ color: C.textMuted }}>{desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-8" style={{ background: C.card, border: `1px solid ${C.divider}` }}>

        <Section title="Return Policy">
          <p>We offer a <strong>30-day return policy</strong> from the date of delivery. To be eligible for a return, items must be:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Unused and in the same condition as received</li>
            <li>In their original packaging</li>
            <li>Accompanied by proof of purchase (order number or receipt)</li>
          </ul>
        </Section>

        <Section title="Non-Returnable Items">
          <p>The following items cannot be returned:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Custom or made-to-order furniture</li>
            <li>Items that have been assembled or used</li>
            <li>Items damaged due to misuse or negligence</li>
            <li>Sale items marked as final sale</li>
          </ul>
        </Section>

        <Section title="How to Initiate a Return">
          <p>To start a return:</p>
          <ol className="list-decimal pl-5 space-y-1 mt-2">
            <li>Email <a href="mailto:support@furnihub.com" style={{ color: C.accent }}>support@furnihub.com</a> with your order number and reason for return</li>
            <li>Our team will respond within 1–2 business days with return instructions</li>
            <li>Pack the item securely in its original packaging</li>
            <li>Ship the item to the address provided by our team</li>
          </ol>
        </Section>

        <Section title="Refunds">
          <p>Once we receive and inspect the returned item, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed within <strong>5–7 business days</strong> to your original payment method.</p>
          <p className="mt-2">For Cash on Delivery orders, refunds will be issued via bank transfer. Please provide your bank details when initiating the return.</p>
        </Section>

        <Section title="Defective or Damaged Items">
          <p>If you receive a defective or damaged item, please contact us within <strong>48 hours</strong> of delivery with photos of the damage. We will arrange a free return pickup and send a replacement or issue a full refund at no extra cost.</p>
        </Section>

        <Section title="Return Shipping Costs">
          <p>For defective or incorrect items, FurniHub covers return shipping costs. For change-of-mind returns, the customer is responsible for return shipping charges.</p>
        </Section>

        <Section title="Contact Us">
          <p>For returns and refund enquiries, email <a href="mailto:support@furnihub.com" style={{ color: C.accent }}>support@furnihub.com</a> or call <strong>+94 71 234 5678</strong>.</p>
        </Section>

      </div>
    </div>
  </div>
)

export default Returns;