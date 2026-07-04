import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // Group cart items to display in Order Summary
  const groupedCartItems = cartItems.reduce((acc, item) => {
    const found = acc.find((i) => i.id === item.id);
    if (found) {
      found.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const totalItems = cartItems.length;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const deliveryCharge = 0;
  const grandTotal = subtotal + deliveryCharge;

  // Handle countdown and redirect on success
  useEffect(() => {
    let timer;
    if (isSubmitted) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/products');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSubmitted, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Custom Validation Check
    const emptyFields = Object.keys(formData).filter((key) => !formData[key].trim());
    if (emptyFields.length > 0) {
      toast.error('Please fill in all shipping fields.');
      return;
    }

    // Success flow
    clearCart();
    setIsSubmitted(true);
    toast.success('Order placed successfully!');
  };

  if (isSubmitted) {
    return (
      <div className="checkout-page success-container">
        <div className="checkout-success-card">
          <div className="success-icon">✓</div>
          <h1 className="success-title">Order Placed Successfully!</h1>
          <p className="success-text">
            Thank you for shopping with us, <strong>{formData.fullName}</strong>.
          </p>
          <p className="success-subtext">
            Your order has been received. You will be redirected to the products list in{' '}
            <span className="countdown-number">{countdown}</span> seconds.
          </p>
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page empty-checkout-container">
        <div className="empty-checkout-card">
          <h2>Your Cart is Empty</h2>
          <p>Please add products to your cart before proceeding to checkout.</p>
          <Link to="/products" className="continue-shopping-btn">
            Go to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-content-wrapper">
        {/* Shipping Form */}
        <form onSubmit={handleSubmit} className="checkout-form-container">
          <h2 className="section-title">Shipping Address</h2>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="e.g. John Doe"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g. john@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. 9876543210"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Flat/House No, Colony, Street"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="e.g. Mumbai"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="e.g. Maharashtra"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="e.g. 400001"
                required
              />
            </div>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="checkout-summary-container">
          <h2 className="section-title">Order Summary</h2>
          <div className="checkout-summary-items">
            {groupedCartItems.map((item) => (
              <div key={item.id} className="summary-item-row">
                <div className="item-thumbnail-wrapper">
                  <img src={item.image} alt={item.title} className="summary-item-thumbnail" />
                  <span className="summary-item-qty">{item.quantity}</span>
                </div>
                <div className="summary-item-info">
                  <span className="summary-item-name">{item.title}</span>
                  <span className="summary-item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="totals-row">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="totals-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="totals-row">
              <span>Delivery Charge</span>
              <span>₹{deliveryCharge.toFixed(2)}</span>
            </div>
            <hr className="totals-divider" />
            <div className="totals-row grand-total">
              <span>Grand Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
