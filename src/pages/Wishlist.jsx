import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="wishlist-page">
      <h1 className="wishlist-title">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty.</p>
        </div>
      ) : (
        <div className="wishlist-content-wrapper">
          <div className="wishlist-items-container">
            <div className="wishlist-items-list">
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-item">
                  <img src={item.image} alt={item.title} className="wishlist-item-image" />
                  <div className="wishlist-item-details">
                    <span className="wishlist-item-category">{item.category}</span>
                    <h3 className="wishlist-item-title">{item.title}</h3>
                    <p className="wishlist-item-price">₹{item.price.toFixed(2)}</p>
                  </div>
                  <div className="wishlist-item-actions">
                    <Link to={`/product/${item.id}`} className="view-details-btn">
                      View Details
                    </Link>
                    <button
                      type="button"
                      className="wishlist-item-remove-btn"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
