import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { WishlistProvider, useWishlist } from './context/WishlistContext'
import RoomAnalyzer from './pages/RoomAnalyzer'

// ── Layout ──
import UserLayout    from "./components/layout/UserLayout";
import AdminLayout   from './components/admin/AdminLayout'
import AdminGuard    from './components/admin/AdminGuard'

// ── Common ──
import Header    from './components/common/Header'
import CartDrawer from './components/layout/CartDrawer'

// ── Customer Pages ──
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
import Wishlist       from './pages/Wishlist'
import MyOrders      from './pages/MyOrders'
import NotFound      from './pages/NotFound'

// ── Admin Pages ──
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts  from './pages/admin/AdminProducts'
import AdminOrders    from './pages/admin/AdminOrders'

function AppShell() {
  const [cartOpen, setCartOpen] = useState(false)

  const { cartItems, cartCount, cartMessage, updateQty, removeFromCart } = useCart()
  const { wishlistCount } = useWishlist()

  return (
    <BrowserRouter>
      <Routes>

        {/* ── Customer routes — with Header + Footer ── */}
        <Route
          element={
            <>
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
              {cartMessage && (
                <div
                  className="fixed right-4 top-20 z-50 rounded-xl px-4 py-3 text-sm font-semibold shadow-lg"
                  style={{ background: '#2C1A0E', color: '#FFFFFF' }}
                  role="status"
                >
                  {cartMessage}
                </div>
              )}
              <UserLayout />
            </>
          }
        >
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
          <Route path="/wishlist"     element={<Wishlist />}       />
          <Route path="/my-orders"    element={<MyOrders />}       />
          <Route path="*"            element={<NotFound />}       />
          <Route path="/room-analyzer" element={<RoomAnalyzer />} />
        </Route>

        {/* ── Admin routes — own layout, no Header/Footer ── */}
        <Route
          path="/admin/*"
          element={
            <AdminGuard>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products"  element={<AdminProducts />}  />
                  <Route path="orders"    element={<AdminOrders />}    />
                </Routes>
              </AdminLayout>
            </AdminGuard>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AppShell />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App;