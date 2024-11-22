import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';
import Login from './Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FaShoppingCart } from 'react-icons/fa';
// import { product_list } from '../assets/asset';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleLoginClick = () => setShowLogin(true);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (lowerCaseQuery) {
      const filteredProducts = product_list.filter(product =>
        product.product_name.toLowerCase().includes(lowerCaseQuery)
      );
      setSearchResults(filteredProducts);
      setSuggestions([]); // Clear suggestions when showing results
    } else {
      setSearchResults([]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      setSuggestions([]);
      setSearchResults([]);
    } else {
      const filteredSuggestions = product_list.filter(product =>
        product.product_name.toLowerCase().includes(query.toLowerCase())
      ).map(product => product.product_name);
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSuggestions([]); // Clear suggestions as well
  };

//   const handleSearchInputChange = async (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     if (query.trim() === "") {
//         setSuggestions([]);
//         return;
//     }

//     try {
//         const response = await fetch(`/search/products?q=${query}`);
//         const data = await response.json();

//         if (response.ok) {
//             const productNames = data.results.map(product => product.product_name);
//             setSuggestions(productNames); // Display product name suggestions
//         } else {
//             console.error(data.error);
//         }
//     } catch (err) {
//         console.error("Error fetching suggestions:", err);
//     }
// };

// const handleSuggestionClick = (suggestion) => {
//     setSearchQuery(suggestion);
//     setSuggestions([]);
//     fetchSearchResults(suggestion); // Fetch full search results
// };

// const fetchSearchResults = async (query) => {
//     try {
//         const response = await fetch(`/search/products?q=${query}`);
//         const data = await response.json();

//         if (response.ok) {
//             setSearchResults(data.results);
//         } else {
//             console.error(data.error);
//         }
//     } catch (err) {
//         console.error("Error fetching search results:", err);
//     }
// };

// const handleSearchClear = () => {
//     setSearchQuery("");
//     setSearchResults([]);
//     setSuggestions([]);
// };


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
                  onClick={toggleSearchBar} // Toggle the search bar visibility
                  // onClick={() => setShowSearchBar(!showSearchBar)}
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
              onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
            />
            {suggestions.length > 0 && searchResults.length === 0 && (
              <ul className="search-suggestions">
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="suggestion-item">
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </header>

      {searchResults.length > 0 && (
        <div className="search-results">
          <div className="search-results-container">
            {searchResults.map((product, index) => (
              <div key={index} className="search-result-item">
                <img src={product.product_image} alt={product.product_name} className="search-product-image" />
                <p>{product.product_name}</p>
                {/* <p>₹{product.product_price}</p> */}
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <div className="search-results-container">
          {searchResults
            .filter(product => product.product_name.toLowerCase() !== searchQuery.toLowerCase())
            .map((product, index) => (
              <div key={index} className="search-result-item">
                <img
                  src={product.product_image}
                  alt={product.product_name}
                  className="search-product-image"
                />
                <p>{product.product_name}</p>
              </div>
            ))}
        </div>
      </div>
      {searchResults.length === 0 && searchQuery.trim() !== '' && (
        <p>No products found for "{searchQuery}"</p>
      )}

      {showLogin && <Login onLoginSuccess={handleLoginSuccess} onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Header;
