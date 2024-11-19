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
import Cart from './pages/Cart';  // Import the Cart component
import AssessmentForm from './components/AssessmentForm'; // Import the AssessmentForm component
import './App.css';

function App() {
  const [cart, setCart] = useState([]); // cart state is now in App.jsx

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]); // Initialize quantity to 1
  };

  const handleRemoveFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index)); // Remove product from cart
  };

  // Handle quantity updates in the cart
  const handleUpdateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: newQuantity,
      };
      return updatedCart;
    });
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
            {/* Add the Cart route here */}
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  onRemoveFromCart={handleRemoveFromCart}
                  onUpdateQuantity={handleUpdateQuantity} // Pass the function
                />
              }
            />
            {/* Add the AssessmentForm route */}
            <Route path="/assessment-form" element={<AssessmentForm />} />
          </Routes>
        </main>
        {showLogin && <Login onClose={handleCloseLogin} />}
      </div>
    </Router>
  );
}

export default App;
