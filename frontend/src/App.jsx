import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext'
import UserLayout     from "./components/layout/UserLayout";
import Header         from './components/common/Header'
import CartDrawer     from './components/layout/CartDrawer'
import Home           from './pages/Home'
import Products       from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart           from './pages/Cart'
import Checkout       from './pages/Checkout'

// ── Inner app — runs INSIDE CartProvider so useCart() works here ──
function AppShell() {
  const [cartOpen,      setCartOpen]      = useState(false)
  const [wishlistCount, setWishlistCount] = useState(0)

  const { cartItems, cartCount, updateQty, removeFromCart } = useCart()

  return (
    <BrowserRouter>
      {/* ── Global Header — layout wrapper එකෙන් පිටත ── */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onCartClick={() => setCartOpen(true)}
      />

      {/* ── Cart Drawer — CartContext එකේ data ම පෙන්වනවා ── */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
      />

      {/* ── Routes — <main> wrapper UserLayout ඇතුළේ ── */}
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/"             element={<Home />}           />
          <Route path="/products"     element={<Products />}       />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart"         element={<Cart />}           />
          <Route path="/checkout"     element={<Checkout />}       />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

// ── Outer App — wraps everything in CartProvider ──
function App() {
  return (
    <CartProvider>
      <AppShell />
    </CartProvider>
  )
}

export default App;