import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';
import Login from './Login';

const Header = () => {
  //current state and setter function
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginClick = () => {
    setShowLogin(true);
  };
  const handleLogout = () => {
    setUser(null);
  };

  const handleLoginSuccess = (userName) => {
    setUser(userName);
    setShowLogin(false);
  };
  

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="logo-container">
            <img src={logo} alt="Clesa Logo" className="header-logo" />
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li className="dropdown">
              <button className="dropbtn">Shop</button>
              <div className="dropdown-content">
                <Link to="/Skincare">Skincare</Link>
                <Link to="/haircare">Haircare</Link>
                <Link to="/Bodycare">Bodycare</Link>
                <Link to="/Fragrance">Fragrance</Link>
              </div>
            </li>
            <li>
              {user ? (
                <>
                  <span>Welcome, {user}</span>
                  <button className="login-btn" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <button className="login-btn" onClick={handleLoginClick}>Login</button>
              )}
            </li>
          </ul>
        </nav>
      </header>
      {showLogin && <Login onLoginSuccess={handleLoginSuccess} onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Header;