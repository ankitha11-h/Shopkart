import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Navbar.css';

const Navbar = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const totalCartItems = cartItems.length;
  const totalWishlistItems = wishlistItems.length;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">ShopKart</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/wishlist">
            Wishlist{totalWishlistItems > 0 && <span className="navbar-wishlist-count"> ({totalWishlistItems})</span>}
          </Link>
        </li>
        <li>
          <Link to="/cart">
            Cart{totalCartItems > 0 && <span className="navbar-cart-count"> ({totalCartItems})</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
