import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';
import Login from './Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleLoginClick = () => setShowLogin(true);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const handleLoginSuccess = (userName) => {
    setUser(userName);
    setShowLogin(false);
  };

  const toggleSearchBar = () => setShowSearchBar((prev) => !prev);
  const toggleMenu = () => setShowMenu((prev) => !prev);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleSearchClear = () => {
    setSearchQuery(''); // Clear search input
    setSearchResults([]); // Reset search results
    setSuggestions([]); // Clear suggestions
  };

  const handleSearchInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSuggestions([]);
      setSearchResults([]); // Clear results when query is empty
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/search/products?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (response.ok) {
        const productNames = data.results.map((product) => product.product_name);
        setSuggestions(productNames); // Populate suggestions
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  };

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:5000/search/products?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch search results: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.results && Array.isArray(data.results)) {
        setSearchResults(data.results);
      } else {
        console.error('Unexpected response format:', data);
      }
    } catch (err) {
      console.error('Error fetching search results:', err);
    }

    // Scroll to top after search
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

          <ul className={`nav-links ${showMenu ? 'active' : ''}`}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/Skincare">Skincare</Link></li>
            <li><Link to="/haircare">Haircare</Link></li>
            <li><Link to="/Bodycare">Bodycare</Link></li>
            <li><Link to="/Fragrance">Fragrance</Link></li>
          </ul>

          <div className="last-container">
            <div>
              {user ? (
                <>
                  <span>Welcome, {user}</span>
                  <button className="login-btn" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <button className="login-btn" onClick={handleLoginClick}>Login</button>
              )}
            </div>
            <div>
              <Link to="/cart">
                <FaShoppingCart className="cart-icon" />
              </Link>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search-icon"
                onClick={toggleSearchBar}
              />
            </div>
          </div>
        </nav>

        {showSearchBar && (
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            />
            {searchQuery && (
              <button className="clear-btn" onClick={handleSearchClear}>
                Clear
              </button>
            )}
            {suggestions.length > 0 && (
              <ul className="search-suggestions">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="suggestion-item"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </header>

      {searchResults.length > 0 ? (
        <div className="search-results-container">
          {searchResults.map((product) => (
            <div key={product._id} className="search-result-item">
              <img
                src={product.product_image || '/placeholder.jpg'}
                alt={product.product_name}
                className="search-product-image"
                />
                <p>{product.product_name}</p>
                <p>₹{product.product_price}</p>
              </div>
            ))}
          </div>
        ) : (
          searchQuery.trim() !== '' && <p>No products found for "{searchQuery}"</p>
        )}
  
        {showLogin && <Login onLoginSuccess={handleLoginSuccess} onClose={() => setShowLogin(false)} />}
      </>
    );
  };
  
  export default Header;