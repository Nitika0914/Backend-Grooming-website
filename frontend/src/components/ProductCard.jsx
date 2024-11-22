import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1); // Track quantity

  const handleAddToCart = () => {
    // Pass quantity along with product to the cart
    onAddToCart(product, quantity); 
    setAdded(true); // Change button state to "Added"
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, e.target.value); // Prevent negative or zero quantity
    setQuantity(newQuantity);
  };

  return (
        <div className="product-card">
          <img
            src={product.product_image}
            alt={product.product_name}
            className="product-image"
          />
          <div className="product-details">
            <h4>{product.product_name}</h4>
            <p className="price">₹{product.product_price.toFixed(2)}</p>
          </div>
          <button
            className={`add-to-cart-btn ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? "Added" : "Add to Cart"}
          </button>
        </div>
  );
};

export default ProductCard;

