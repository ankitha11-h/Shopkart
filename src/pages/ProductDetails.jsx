import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { productsData } from '../data/ProductsData';
import ProductCard from '../components/ProductCard';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [recentProducts, setRecentProducts] = useState([]);

  const product = productsData.find((p) => p.id === Number(id));

  useEffect(() => {
    if (product) {
      const savedList = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
      const filteredList = savedList.filter((item) => item.id !== product.id);
      const newList = [product, ...filteredList].slice(0, 4);
      localStorage.setItem('recentlyViewed', JSON.stringify(newList));

      setRecentProducts(newList.filter((item) => item.id !== product.id));
    }
  }, [product]);

  if (!product) {
    return (
      <div className="product-details-error">
        <h2>Product not found!</h2>
      </div>
    );
  }

  const { image, title, category, price, description } = product;

  return (
    <div className="product-details-container">
      <div className="product-details-content">
        <div className="product-details-image-section">
          <img src={image} alt={title} className="product-details-image" />
          <button
            className="wishlist-btn-details"
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label={isWishlisted(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            {isWishlisted(product.id) ? '❤️' : '♡'}
          </button>
        </div>
        <div className="product-details-info-section">
          <span className="product-details-category">{category}</span>
          <h1 className="product-details-title">{title}</h1>
          <p className="product-details-price">₹{price.toFixed(2)}</p>
          <p className="product-details-description">{description}</p>
          <button
            className="product-details-button"
            type="button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {recentProducts.length > 0 && (
        <div className="recently-viewed-section">
          <h2 className="recently-viewed-title">Recently Viewed Products</h2>
          <div className="recently-viewed-grid">
            {recentProducts.map((recentProduct) => (
              <ProductCard key={recentProduct.id} product={recentProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
