import React from 'react'
import Topbar from '../layout/Topbar'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <Topbar />
      <header className="bg-slate-900 text-white py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-4xl font-extrabold">FurniHub</span>
          </div>
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/products" className="hover:underline">Products</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header;
