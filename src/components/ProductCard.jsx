import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const { id, image, title, category, price, description } = product;

  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-card-image-link">
        <div className="product-card-image-container">
          <img src={image} alt={title} className="product-card-image" />
        </div>
      </Link>
      <div className="product-card-info">
        <span className="product-card-category">{category}</span>
        <h3 className="product-card-title">
          <Link to={`/product/${id}`}>{title}</Link>
        </h3>
        <p className="product-card-description">{description}</p>
        <div className="product-card-footer">
          <span className="product-card-price">₹{price.toFixed(2)}</span>
          <button
            className="product-card-button"
            type="button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
