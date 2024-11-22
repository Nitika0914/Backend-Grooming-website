

////////////////

import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ cart, onRemoveFromCart, onUpdateQuantity }) => {
  const [discount, setDiscount] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);

  // Calculate total in INR with quantity considered
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.product_price * product.quantity, 0);
  };

  const totalPriceInINR = calculateTotal();

  // Calculate and set discount and shipping charges based on cart value
  useEffect(() => {
    // Apply 5% discount
    setDiscount((totalPriceInINR * 10) / 100);

    // Apply ₹99 shipping if cart value is less than ₹999
    setShippingCharges(totalPriceInINR < 999 ? 99 : 0);
  }, [totalPriceInINR]);

  // Calculate final total after applying discount and adding shipping charges
  const finalTotal = Math.max(
    0,
    totalPriceInINR - discount + shippingCharges
  );

  const handleQuantityChange = (index, newQuantity) => {
    onUpdateQuantity(index, newQuantity); // Call the parent function
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
    // Add your checkout logic here
  };

  return (
    <>
      <h3>Your Shopping Cart</h3>
    <div className="cart-page">
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

              <button onClick={() => onRemoveFromCart(index)} className="remove-btn">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}


      {/* Checkout Button */}
      {cart.length > 0 && (
        <div className="checkout-section">
          <div className="price-summary">
          <h4>Subtotal: ₹{new Intl.NumberFormat().format(totalPriceInINR)}</h4>
          <h4>Discount (10%): -₹{new Intl.NumberFormat().format(discount)}</h4>
          <h4>Shipping Charges: ₹{new Intl.NumberFormat().format(shippingCharges)}</h4>
          <h4>Final Total: ₹{new Intl.NumberFormat().format(finalTotal)}</h4>
        </div>
          <div className="checkout-btn-container">
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}


    </div>
    </>
  );
};

export default Cart;
