import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  if (!product) return null;

  const { id, image, title, price, originalPrice, onSale, description, rating, reviews } = product;

  const renderStars = (ratingVal) => {
    const stars = [];
    const floorRating = Math.round(ratingVal || 5);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          fill={i <= floorRating ? "#ffc107" : "none"}
          color={i <= floorRating ? "#ffc107" : "#e4e5e9"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-card-image-container">
        {onSale && <span className="sale-badge">Sale</span>}
        <Link to={`/product/${id}`} className="product-card-image-link">
          <img src={image} alt={title} className="product-card-image" />
        </Link>
        <button
          className={`wishlist-btn ${isWishlisted(id) ? 'wishlisted' : ''}`}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isWishlisted(id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            size={18}
            fill={isWishlisted(id) ? "#ef4444" : "none"}
            color={isWishlisted(id) ? "#ef4444" : "#4a5568"}
          />
        </button>
      </div>
      <div className="product-card-info">
        <div className="product-card-rating">
          <div className="stars-container">{renderStars(rating)}</div>
          <span className="reviews-count">({reviews || 0})</span>
        </div>
        <h3 className="product-card-title">
          <Link to={`/product/${id}`}>{title}</Link>
        </h3>
        <p className="product-card-description">{description}</p>
        <div className="product-card-footer">
          <div className="price-container">
            <span className="product-card-price">₹{price.toFixed(2)}</span>
            {onSale && originalPrice && (
              <span className="product-card-original-price">₹{originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            className="product-card-cart-btn"
            type="button"
            onClick={() => addToCart(product)}
            aria-label="Add to Cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
