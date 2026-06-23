import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import UserLayout     from "./components/layout/UserLayout";
import Header         from './components/common/Header'
import CartDrawer     from './components/layout/CartDrawer'
import Home           from './pages/Home'
import Products       from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart           from './pages/Cart'
import Checkout       from './pages/Checkout'
import Sale           from './pages/Sale'
import About          from './pages/About'
import Contact        from './pages/Contact'
import Login          from './pages/Login'
import Signup         from './pages/Signup'
import Account        from './pages/Account'

function AppShell() {
  const [cartOpen,      setCartOpen]      = useState(false)
  const [wishlistCount, setWishlistCount] = useState(0)

  const { cartItems, cartCount, updateQty, removeFromCart } = useCart()

  return (
    <BrowserRouter>
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onCartClick={() => setCartOpen(true)}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
      />

      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/"             element={<Home />}           />
          <Route path="/products"     element={<Products />}       />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart"         element={<Cart />}           />
          <Route path="/checkout"     element={<Checkout />}       />
          <Route path="/sale"         element={<Sale />}           />
          <Route path="/about"        element={<About />}          />
          <Route path="/contact"      element={<Contact />}        />
          <Route path="/login"        element={<Login />}          />
          <Route path="/signup"       element={<Signup />}         />
          <Route path="/account"      element={<Account />}        />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </AuthProvider>
  )
}

export default App;