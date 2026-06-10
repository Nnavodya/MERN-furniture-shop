import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../layout/Footer';

const UserLayout = () => {
  return (
    <>
      {/* Page content — Outlet = current route's page component */}
      <main className="min-h-screen" style={{ background: '#FAF7F4' }}>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default UserLayout;