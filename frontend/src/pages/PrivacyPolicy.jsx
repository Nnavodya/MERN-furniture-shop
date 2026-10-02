import React from 'react'
import { TbLock, TbUser, TbShoppingBag, TbMail } from 'react-icons/tb'

const C = {
  bg: '#FAF7F4',
  card: '#FFFFFF',
  accent: '#8B5E2E',
  accentLight: 'rgba(139,94,46,0.08)',
  text: '#2C1A0E',
  textMuted: 'rgba(44,26,14,0.55)',
  divider: 'rgba(139,94,46,0.12)',
}

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-bold mb-3" style={{ color: C.text }}>{title}</h2>
    <div className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{children}</div>
  </div>
)

const PrivacyPolicy = () => (
  <div style={{ background: C.bg, minHeight: '100vh' }}>
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
          style={{ background: C.accentLight }}
        >
          <TbLock className="h-6 w-6" style={{ color: C.accent }} />
        </div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: C.accent }}>
          Legal
        </p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: C.text }}>Privacy Policy</h1>
        <p className="text-sm" style={{ color: C.textMuted }}>Last updated: January 2026</p>
      </div>

      <div className="rounded-2xl p-8" style={{ background: C.card, border: `1px solid ${C.divider}` }}>
        <Section title="Information We Collect">
          <p>When you use FurniHub, we may collect information you provide, such as your name, email address, delivery details, and account credentials. If you place an order, we also process order and transaction details needed to fulfill it.</p>
        </Section>

        <Section title="How We Use Information">
          <p>We use your information to manage your account, process and deliver orders, respond to enquiries, and maintain and improve our services. We use order and account details only as needed for these purposes and to meet applicable legal obligations.</p>
        </Section>

        <Section title="Sharing Information">
          <p>We do not sell your personal information. We may share relevant details with service providers that help us operate the store, process payments, or deliver orders. These providers receive only the information needed to perform their services and are expected to protect it.</p>
        </Section>

        <Section title="Cookies and Storage">
          <p>Our website may use browser storage or similar technologies to support essential features such as keeping your shopping experience and preferences available. You can manage browser storage through your browser settings; some site features may not work as expected if it is disabled.</p>
        </Section>

        <Section title="Data Retention and Security">
          <p>We retain personal information for as long as needed to provide our services, complete transactions, and meet legal requirements. We use reasonable safeguards to protect information, but no method of storage or transmission is completely secure.</p>
        </Section>

        <Section title="Your Choices">
          <p>You can review or update account details through your account settings. You may also request access to, correction of, or deletion of your personal information, subject to information we must retain for legal or operational reasons.</p>
        </Section>

        <Section title="Children's Privacy">
          <p>FurniHub is not intended for children under 16, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can address it.</p>
        </Section>

        <Section title="Changes to This Policy">
          <p>We may update this policy from time to time. Updates will be posted on this page with a revised date. Your continued use of the website after an update means the revised policy applies to your use.</p>
        </Section>

        <Section title="Contact Us">
          <p>For privacy questions or requests, email <a href="mailto:support@furnihub.com" style={{ color: C.accent }}>support@furnihub.com</a>.</p>
        </Section>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {[
          { icon: TbUser, label: 'Account information' },
          { icon: TbShoppingBag, label: 'Order details' },
          { icon: TbMail, label: 'Privacy requests' },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 p-4 rounded-xl"
            style={{ background: C.card, border: `1px solid ${C.divider}` }}
          >
            <Icon className="h-5 w-5 shrink-0" style={{ color: C.accent }} />
            <span className="text-sm font-semibold" style={{ color: C.text }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default PrivacyPolicy