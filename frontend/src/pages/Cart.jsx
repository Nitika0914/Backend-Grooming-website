import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext); // Access cart from context
  const [discount, setDiscount] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.product_price * product.quantity, 0);
  };

  const totalPriceInINR = calculateTotal();

  useEffect(() => {
    setDiscount((totalPriceInINR * 10) / 100); // 10% discount
    setShippingCharges(totalPriceInINR < 999 ? 99 : 0); // ₹99 shipping if total is < ₹999
  }, [totalPriceInINR]);

  const finalTotal = Math.max(0, totalPriceInINR - discount + shippingCharges);

  const handleQuantityChange = (index, newQuantity) => {
    updateQuantity(index, newQuantity); // Use context method to update quantity
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

                <button
                  onClick={() => removeFromCart(index)} // Use context method to remove item
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Checkout Section */}
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
