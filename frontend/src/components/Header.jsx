import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';
import Login from './Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FaShoppingCart } from 'react-icons/fa';
const Header = () => {
  // current state and setter function
  const [showMenu, setShowMenu] = useState(false); 
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);

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
  const toggleSearchBar = () => setShowSearchBar((prev) => !prev);
  const toggleMenu = () => setShowMenu((prev) => !prev);
  return (
    <>
      <header>
        <nav className="navbar">
          <div className="logo-container">
            <FontAwesomeIcon
              icon={showMenu ? faTimes : faBars}
              className="hamburger-icon"
              onClick={toggleMenu}
            />
            <img src={logo} alt="Clesa Logo" className="header-logo" />
          </div>

          {/* Hamburger menu: Home, Contact Us, About Us, Shop */}
          <ul className={`nav-links ${showMenu ? 'active' : ''}`}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
           <li><Link to="/Skincare">Skincare</Link></li>
            <li><Link to="/haircare">Haircare</Link></li>
            <li><Link to="/Bodycare">Bodycare</Link></li>
            <li><Link to="/Fragrance">Fragrance</Link></li> 
          </ul>

          {/* Static items: Login, Search, and Cart */}
          <div className="static-elements">
          <li>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search-icon"
                onClick={toggleSearchBar}
              />
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
            {/* Cart link added here */}
            <li>
            <Link to="/cart">
              <FaShoppingCart className="cart-icon" />
            </Link>
            </li>
            </div>
          {showSearchBar && (
            <div className="search-bar-container">
              <input
                type="text"
                className="search-bar"
                placeholder="Search..."
              />
            </div>
          )}
        </nav>
      </header>
      {showLogin && <Login onLoginSuccess={handleLoginSuccess} onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Header;
