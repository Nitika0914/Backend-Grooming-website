import React from 'react';
import './Cart.css';

const Cart = ({ cart, onRemoveFromCart, onUpdateQuantity }) => {
  // Calculate total in INR with quantity considered
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.product_price * product.quantity, 0);
  };

  const totalPriceInINR = calculateTotal();

  const handleQuantityChange = (index, newQuantity) => {
    // Update the quantity in the cart
    onUpdateQuantity(index, newQuantity);
  };

  return (
    <div className="cart-page">
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((product, index) => (
            <div key={index} className="cart-item">
              <img 
                src={product.product_image} 
                alt={product.product_name} 
                className="cart-item-img" 
              />
              <div className="product-info">
                <span className="product-name">{product.product_name}</span>
                <span className="product-price">
                  ₹{new Intl.NumberFormat().format(product.product_price)}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="quantity-container">
                <button 
                  className="quantity-btn" 
                  onClick={() => handleQuantityChange(index, product.quantity - 1)} 
                  disabled={product.quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={product.quantity}
                  className="quantity-input"
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                />
                <button 
                  className="quantity-btn" 
                  onClick={() => handleQuantityChange(index, product.quantity + 1)}
                >
                  +
                </button>
              </div>

              <button onClick={() => onRemoveFromCart(index)} className="remove-btn">Remove</button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="total-price">
          <h4>Total: ₹{new Intl.NumberFormat().format(totalPriceInINR)}</h4>
        </div>
      )}
    </div>
  );
};

export default Cart;
