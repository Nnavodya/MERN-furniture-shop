// v1: Basic routing setup
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLayout from "./components/layout/UserLayout";
import Header from './components/common/Header'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-screen" style={{ background: '#FAF7F4' }}>
        <Routes>
          <Route path="/user"         element={<UserLayout />}     />
          <Route path="/"             element={<Home />}           />
          <Route path="/products"     element={<Products />}       />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart"         element={<Cart />}           />
          <Route path="/checkout"     element={<Checkout />}       />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;