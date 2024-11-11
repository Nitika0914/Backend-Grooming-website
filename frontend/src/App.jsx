import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import Skincare from './pages/Skincare';
import Haircare from './pages/Haircare';
import Bodycare from './pages/Bodycare';
import Fragrance from './pages/Fragrance';
import Footer from './components/Footer';
import Login from './components/Login';
import Cart from './pages/Cart';
import './App.css'; 

function App() {
  const [cart, setCart] = useState([]); // cart state is now in App.jsx

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]); // Add product to cart
  };

  const handleRemoveFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index)); // Remove product from cart
  };

  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Show the login modal after 20 seconds
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <Router>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<Home cart={cart} onAddToCart={handleAddToCart} />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/products/:productId" element={<ProductPage />} />
            <Route path="/skincare" element={<Skincare />} />
            <Route path="/haircare" element={<Haircare />} />
            <Route path="/bodycare" element={<Bodycare />} />
            <Route path="/fragrance" element={<Fragrance />} />
            <Route path="/cart" element={<Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />} />
          </Routes>
        </main>
        {showLogin && <Login onClose={handleCloseLogin} />}
      </div>
    </Router>
  );
}

export default App;
