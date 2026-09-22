import React from 'react'
import { TbTruck, TbClock, TbMapPin, TbPackage } from 'react-icons/tb'

const C = {
  bg:          '#FAF7F4',
  card:        '#FFFFFF',
  accent:      '#8B5E2E',
  accentLight: 'rgba(139,94,46,0.08)',
  accentBorder:'rgba(139,94,46,0.18)',
  text:        '#2C1A0E',
  textMuted:   'rgba(44,26,14,0.55)',
  divider:     'rgba(139,94,46,0.12)',
}

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-bold mb-3" style={{ color: C.text }}>{title}</h2>
    <div className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{children}</div>
  </div>
)

const ShippingPolicy = () => (
  <div style={{ background: C.bg, minHeight: '100vh' }}>
    <div className="container mx-auto px-4 py-12 max-w-3xl">

      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: C.accent }}>
          Shipping
        </p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: C.text }}>Shipping Policy</h1>
        <p className="text-sm" style={{ color: C.textMuted }}>Last updated: January 2026</p>
      </div>

      {/* Quick info cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { icon: TbTruck,   title: 'Free Shipping',   desc: 'On orders over $100' },
          { icon: TbClock,   title: '3–7 Days',        desc: 'Standard delivery'   },
          { icon: TbPackage, title: 'Tracked',         desc: 'Every order'         },
          { icon: TbMapPin,  title: 'Island-wide',     desc: 'Sri Lanka delivery'  },
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

        <Section title="Delivery Timeframes">
          <p className="mb-2">We offer the following delivery options at checkout:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Standard Delivery:</strong> 3–7 business days — Free on orders over $100, otherwise $25.</li>
            <li><strong>Express Delivery:</strong> 1–2 business days — $45 flat fee.</li>
            <li><strong>White-Glove Delivery:</strong> Scheduled appointment — includes in-room placement and basic assembly for large items.</li>
          </ul>
        </Section>

        <Section title="Free Shipping Threshold">
          <p>All orders with a subtotal of <strong>$100 or more</strong> (after any discounts) qualify for free standard delivery. This applies automatically at checkout — no coupon code required.</p>
        </Section>

        <Section title="Order Processing">
          <p>Orders are processed within <strong>1–2 business days</strong> of payment confirmation. You will receive an order confirmation email immediately after placing your order, and a dispatch notification with tracking details once your order has been shipped.</p>
        </Section>

        <Section title="Tracking Your Order">
          <p>Once dispatched, you will receive a tracking number via email. You can also track your order by logging into your FurniHub account and visiting the <strong>My Orders</strong> page.</p>
        </Section>

        <Section title="Delivery Areas">
          <p>We currently deliver island-wide across Sri Lanka. For international shipping inquiries, please contact us at <a href="mailto:support@furnihub.com" style={{ color: C.accent }}>support@furnihub.com</a>.</p>
        </Section>

        <Section title="Failed or Missed Deliveries">
          <p>If a delivery attempt is unsuccessful, our courier will leave a notification and attempt redelivery the following business day. After two failed attempts, the order will be held at the nearest depot for 5 days before being returned to us. A redelivery fee may apply.</p>
        </Section>

        <Section title="Damaged or Lost Packages">
          <p>If your order arrives damaged or does not arrive within the estimated timeframe, please contact us within <strong>7 days</strong> of the expected delivery date. We will investigate and arrange a replacement or full refund as appropriate.</p>
        </Section>

        <Section title="Contact Us">
          <p>For shipping enquiries, email <a href="mailto:support@furnihub.com" style={{ color: C.accent }}>support@furnihub.com</a> or call <strong>+94 71 234 5678</strong>. Our support team is available Monday–Saturday, 9am–7pm.</p>
        </Section>

      </div>
    </div>
  </div>
)

export default ShippingPolicy;