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
    <div className="col-md-4 mb-4">
      <figure className="figure">
        <img
          src={product.product_image}
          alt={product.product_name}
          className="figure-img img-fluid rounded animate-img"
        />
        <figcaption className="figure-caption text-center">
          {product.product_name}
        </figcaption>
        <div className="product-price">
          ₹{new Intl.NumberFormat().format(product.product_price)}
        </div>
        
        {/* Quantity Selector */}
        {/* <div className="quantity-container">
          <button 
            className="quantity-btn" 
            onClick={() => setQuantity(quantity - 1)} 
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            className="quantity-input"
            onChange={handleQuantityChange}
          />
          <button 
            className="quantity-btn" 
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div> */}

        <button
          className={`add-to-cart-btn ${added ? 'added' : ''}`}
          onClick={handleAddToCart}
        >
          {added ? "Added" : "Add to Cart"}
        </button>
      </figure>
    </div>
  );
};

export default ProductCard;
