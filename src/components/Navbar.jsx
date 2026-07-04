import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const totalCartItems = cartItems.length;
  const totalWishlistItems = wishlistItems.length;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>
          <span className="desktop-only-logo-emoji">🛒</span>ShopKart
        </Link>
      </div>

      <ul className={`navbar-links ${isOpen ? 'mobile-open' : ''}`}>
        <li>
          <Link to="/" onClick={closeMenu}>Home</Link>
        </li>
        <li>
          <Link to="/products" onClick={closeMenu}>Products</Link>
        </li>
        <li>
          <Link to="/wishlist" onClick={closeMenu}>
            Wishlist{totalWishlistItems > 0 && <span className="navbar-wishlist-count"> ({totalWishlistItems})</span>}
          </Link>
        </li>
        <li>
          <Link to="/cart" onClick={closeMenu}>
            Cart{totalCartItems > 0 && <span className="navbar-cart-count"> ({totalCartItems})</span>}
          </Link>
        </li>
      </ul>

      <div className="navbar-right">
        {/* Theme Toggle Button (Always visible) */}
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          type="button"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {/* Hamburger Menu Toggle (Mobile only) */}
        <button
          className={`hamburger-btn ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
          aria-expanded={isOpen}
          type="button"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
