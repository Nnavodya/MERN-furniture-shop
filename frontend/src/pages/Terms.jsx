import React from 'react'
import { TbFileText } from 'react-icons/tb'

const C = {
  bg:           '#FAF7F4',
  card:         '#FFFFFF',
  accent:       '#8B5E2E',
  accentLight:  'rgba(139,94,46,0.08)',
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

const Terms = () => (
  <div style={{ background: C.bg, minHeight: '100vh' }}>
    <div className="container mx-auto px-4 py-12 max-w-3xl">

      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
          style={{ background: C.accentLight }}
        >
          <TbFileText className="h-6 w-6" style={{ color: C.accent }} />
        </div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: C.accent }}>
          Legal
        </p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: C.text }}>Terms & Conditions</h1>
        <p className="text-sm" style={{ color: C.textMuted }}>Last updated: January 2026</p>
      </div>

      <div className="rounded-2xl p-8" style={{ background: C.card, border: `1px solid ${C.divider}` }}>

        <Section title="Acceptance of Terms">
          <p>By accessing and using the FurniHub website (furnihub.com), you accept and agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our website.</p>
        </Section>

        <Section title="Use of Website">
          <p>You agree to use our website only for lawful purposes. You must not:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Use the site in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorised access to any part of the website</li>
            <li>Transmit any harmful, offensive, or disruptive content</li>
            <li>Use automated tools to scrape or harvest data from the site</li>
          </ul>
        </Section>

        <Section title="Account Registration">
          <p>To place an order, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Please notify us immediately of any unauthorised use of your account.</p>
        </Section>

        <Section title="Product Information">
          <p>We make every effort to display product colours, dimensions, and descriptions as accurately as possible. However, we cannot guarantee that your screen's display will accurately reflect the actual product. Minor variations in colour or finish may occur.</p>
        </Section>

        <Section title="Pricing and Payment">
          <ul className="list-disc pl-5 space-y-1">
            <li>All prices are displayed in USD and are inclusive of applicable taxes.</li>
            <li>We reserve the right to change prices at any time without notice.</li>
            <li>Payment must be made in full at the time of order.</li>
            <li>We accept Visa, Mastercard, American Express, PayPal, and Cash on Delivery.</li>
          </ul>
        </Section>

        <Section title="Order Acceptance">
          <p>Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order. An order is confirmed only upon receipt of a confirmation email from FurniHub. We may cancel an order if a product is out of stock, if payment cannot be processed, or if pricing errors occur.</p>
        </Section>

        <Section title="Intellectual Property">
          <p>All content on this website — including text, images, logos, and product descriptions — is the property of FurniHub and is protected by copyright laws. You may not reproduce, distribute, or use any content without our prior written consent.</p>
        </Section>

        <Section title="Limitation of Liability">
          <p>FurniHub shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our total liability for any claim shall not exceed the amount paid for the product in question.</p>
        </Section>

        <Section title="Governing Law">
          <p>These Terms & Conditions are governed by the laws of Sri Lanka. Any disputes shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.</p>
        </Section>

        <Section title="Changes to Terms">
          <p>We reserve the right to update these Terms & Conditions at any time. Changes will be posted on this page with an updated date. Continued use of the website after changes constitutes acceptance of the new terms.</p>
        </Section>

        <Section title="Contact Us">
          <p>For questions regarding these Terms & Conditions, email <a href="mailto:support@furnihub.com" style={{ color: C.accent }}>support@furnihub.com</a>.</p>
        </Section>

      </div>
    </div>
  </div>
)

export default Terms;