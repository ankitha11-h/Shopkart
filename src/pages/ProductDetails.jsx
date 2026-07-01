import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productsData } from '../data/ProductsData';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = productsData.find((p) => p.id === Number(id));

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
    </div>
  );
};

export default ProductDetails;
