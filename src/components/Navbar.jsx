import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { Search, ShoppingBag, Heart, Sun, Moon, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchVal, setSearchVal] = useState('');

  const totalCartItems = new Set(cartItems.map((item) => item.id)).size;
  const totalWishlistItems = wishlistItems.length;

  useEffect(() => {
    setSearchVal(searchParams.get('search') || '');
  }, [searchParams]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchVal.trim())}`);
    } else {
      navigate('/products');
    }
    closeMenu();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        {/* Hamburger Menu Toggle (Mobile only) */}
        <button
          className={`hamburger-btn ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
          aria-expanded={isOpen}
          type="button"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>
            <span>ShopKart</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className={`navbar-links ${isOpen ? 'mobile-open' : ''}`}>
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''} onClick={closeMenu}>Home</Link>
          </li>
          <li>
            <Link to="/products" className={isActive('/products') ? 'active' : ''} onClick={closeMenu}>Products</Link>
          </li>
          <li>
            <Link to="/wishlist" className={isActive('/wishlist') ? 'active' : ''} onClick={closeMenu}>
              Wishlist
              {totalWishlistItems > 0 && <span className="badge">{totalWishlistItems}</span>}
            </Link>
          </li>
          <li>
            <Link to="/cart" className={isActive('/cart') ? 'active' : ''} onClick={closeMenu}>
              Cart
              {totalCartItems > 0 && <span className="badge">{totalCartItems}</span>}
            </Link>
          </li>
        </ul>

        {/* Right Section: Search & Actions */}
        <div className="navbar-right">
          <form className="navbar-search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products..."
              className="navbar-search-input"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button type="submit" className="navbar-search-btn" aria-label="Search">
              <Search size={18} />
            </button>
          </form>

          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            type="button"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Quick links to Wishlist and Cart for Desktop */}
          <Link to="/wishlist" className="navbar-icon-link desktop-only" aria-label="Wishlist">
            <Heart size={20} />
            {totalWishlistItems > 0 && <span className="icon-badge">{totalWishlistItems}</span>}
          </Link>

          <Link to="/cart" className="navbar-icon-link desktop-only" aria-label="Cart">
            <ShoppingBag size={20} />
            {totalCartItems > 0 && <span className="icon-badge">{totalCartItems}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
