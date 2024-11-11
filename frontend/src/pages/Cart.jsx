// src/pages/Cart.jsx
import React from 'react';

const Cart = ({ cart }) => {
  return (
    <div className="cart-page">
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
            <li key={index}>
              <img src={product.product_image} alt={product.product_name} width="50" />
              <span>{product.product_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
