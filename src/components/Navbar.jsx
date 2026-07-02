import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.length;

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
          <Link to="/cart">
            Cart{totalItems > 0 && <span className="navbar-cart-count"> ({totalItems})</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
