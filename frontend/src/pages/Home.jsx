// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { product_list } from '../assets/asset.js';
import homeimage from '../assets/homeimage.png';
import './Home.css';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';

const Home = () => {
  const [cart, setCart] = useState([]); // Cart state to hold added products

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]); // Add product to cart
    alert(`${product.product_name} added to cart`); // Optional: alert user that the product was added
  };

  const bestsellers = product_list.slice(0, 5);
  const cleanser = product_list.slice(0, 5);
  const moisturizer = product_list.slice(5, 10);
  const serums = product_list.slice(10, 15);
  const eyecream = product_list.slice(15, 20);
  const sunscreen = product_list.slice(20, 25);
  const bodywash = product_list.slice(25, 30);
  const shampoo = product_list.slice(30, 35);
  const facemask = product_list.slice(35, 40);
  const scrub = product_list.slice(45, 50);
  const toner = product_list.slice(55, 60);
  const combokit = product_list.slice(60, 65);
  const combokits = product_list.slice(65, 70);

  return (
    <div className="home">
      <Header />
      <h1 className="main-heading">Welcome to Our Store - Clesa</h1>
      <img src={homeimage} className="homeimage" alt="Home" />

      <div className="container">
        {/* Product Categories */}
        <CategorySection title="Bestsellers" products={bestsellers} onAddToCart={handleAddToCart} />
        <CategorySection title="Cleansers" products={cleanser} onAddToCart={handleAddToCart} />
        <CategorySection title="Moisturizer" products={moisturizer} onAddToCart={handleAddToCart} />
        <CategorySection title="Serums" products={serums} onAddToCart={handleAddToCart} />
        <CategorySection title="Eyecream" products={eyecream} onAddToCart={handleAddToCart} />
        <CategorySection title="Sunscreen" products={sunscreen} onAddToCart={handleAddToCart} />
        <CategorySection title="Bodywash" products={bodywash} onAddToCart={handleAddToCart} />
        <CategorySection title="Shampoo" products={shampoo} onAddToCart={handleAddToCart} />
        <CategorySection title="Facemask" products={facemask} onAddToCart={handleAddToCart} />
        <CategorySection title="Scrub" products={scrub} onAddToCart={handleAddToCart} />
        <CategorySection title="Toner" products={toner} onAddToCart={handleAddToCart} />
        <CategorySection title="Combo Kit" products={combokit} onAddToCart={handleAddToCart} />
        <CategorySection title="Combo Kits" products={combokits} onAddToCart={handleAddToCart} />
      </div>

      {/* Link to the Cart page */}
      <Link to="/cart">
        <button className="view-cart-btn">Go to Cart</button>
      </Link>

      <Footer />
    </div>
  );
};

// Category Section Component
const CategorySection = ({ title, products, onAddToCart }) => (
  <>
    <h4 className="main-heading">{title}</h4>
    <div className="image-gallery row">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  </>
);

export default Home;
