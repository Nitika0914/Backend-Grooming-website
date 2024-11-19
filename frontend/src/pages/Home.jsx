import React, { useState } from 'react';
import { product_list } from '../assets/asset.js';
import homeimage from '../assets/homeimage.png';
import './Home.css';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { Link } from 'react-router-dom';


const Home = ({ cart, onAddToCart }) => {
  const [quantities, setQuantities] = useState({}); // Track quantities of products

  // Function to handle quantity change for each product
  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
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

  const handleAddToCart = (product) => {
    const quantity = quantities[product.product_id] || 1; // Default quantity is 1 if no input
    onAddToCart({ ...product, quantity }); // Pass the product with quantity to onAddToCart
  };

  return (
    <div className="home">
      <Header />
      <h1 className="main-heading">Welcome to Our Store - Clesa</h1>
      <img src={homeimage} className="homeimage" alt="Home" />
      <div className="assessment-container">
        <p className="assessment-text">
          Want to know your skin better? Take the Assessment test now!
        </p>
        <div className="assessment-link-container">
          <a href="/assessment-form" className="assessment-link">
            <button className="assessment-btn">
              Take the Assessment
            </button>
          </a>
        </div>
      </div>
      <hr></hr>
      <div className="container">
        <CategorySection
          title="Bestsellers"
          products={bestsellers}
          quantities={quantities}
          onAddToCart={handleAddToCart}
          onQuantityChange={handleQuantityChange}
        />
        <CategorySection
          title="Cleansers"
          products={cleanser}
          quantities={quantities}
          onAddToCart={handleAddToCart}
          onQuantityChange={handleQuantityChange}
        />
        <CategorySection
          title="Moisturizer"
          products={moisturizer}
          quantities={quantities}
          onAddToCart={handleAddToCart}
          onQuantityChange={handleQuantityChange}
        />
        <CategorySection
          title="Serums"
          products={serums}
          quantities={quantities}
          onAddToCart={handleAddToCart}
          onQuantityChange={handleQuantityChange}
        />
        <CategorySection
          title="Eyecream"
          products={eyecream}
          quantities={quantities}
          onAddToCart={handleAddToCart}
          onQuantityChange={handleQuantityChange}
        />
        <CategorySection
          title="Sunscreen"
          products={sunscreen}
          quantities={quantities}
          onAddToCart={handleAddToCart}
          onQuantityChange={handleQuantityChange}
        />
        <CategorySection
          title="Bodywash"
          products={bodywash}
          quantities={quantities}
          onAddToCart={handleAddToCart}
          onQuantityChange={handleQuantityChange}
        />
        <CategorySection
          title="Shampoo"
          products={shampoo}
          quantities={quantities}
          onAddToCart={handleAddToCart}
          onQuantityChange={handleQuantityChange}
        />
        <CategorySection
          title="Facemask"
          products={facemask}
          quantities={quantities}
          onAddToCart={handleAddToCart}
          onQuantityChange={handleQuantityChange}
        />
        <CategorySection
          title="Scrub"
          products={scrub}
          quantities={quantities}
          onAddToCart={handleAddToCart}
          onQuantityChange={handleQuantityChange}
        />
        <CategorySection
          title="Toner"
          products={toner}
          quantities={quantities}
          onAddToCart={handleAddToCart}
          onQuantityChange={handleQuantityChange}
        />
        <CategorySection
          title="Combo Kit"
          products={combokit}
          quantities={quantities}
          onAddToCart={handleAddToCart}
          onQuantityChange={handleQuantityChange}
        />
        <CategorySection
          title="Combo Kits"
          products={combokits}
          quantities={quantities}
          onAddToCart={handleAddToCart}
          onQuantityChange={handleQuantityChange}
        />
      </div>
      <Footer />
    </div>
  );
};

const CategorySection = ({ title, products, quantities, onAddToCart, onQuantityChange }) => (
  <>
    <h4 className="main-heading">{title}</h4>
    <div className="image-gallery row">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          quantity={quantities[product.product_id] || 1}
          onAddToCart={onAddToCart}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  </>
);

export default Home;
