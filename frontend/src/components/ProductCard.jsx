// src/components/ProductCard.jsx
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
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
        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </figure>
    </div>
  );
};

export default ProductCard;
