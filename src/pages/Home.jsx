import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsData } from '../data/ProductsData';
import ProductCard from '../components/ProductCard';
import { ShieldCheck, Truck, Headphones, ArrowRight, Globe } from 'lucide-react';
import { toast } from 'react-toastify';
import './Home.css';

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Home = () => {
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 15, minutes: 45, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
    } else {
      toast.error('Please enter a valid email address.');
    }
  };

  const trendingProducts = productsData.filter(p => [1, 2, 9, 19].includes(p.id));

  const formatTime = (val) => String(val).padStart(2, '0');

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <header className="hero-section">
        <div className="hero-container container">
          <div className="hero-content">
            <span className="hero-badge">New Arrival 2026</span>
            <h1 className="hero-title">
              Upgrade Your <span className="highlight">Lifestyle</span> Today
            </h1>
            <p className="hero-subtitle">
              Discover the perfect blend of innovation and elegance. Shop our curated collection of premium electronics and minimalist home essentials.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary">Shop Now</Link>
              <Link to="/products" className="btn btn-outline">View Gallery</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="mockup-browser">
              <div className="mockup-browser-header">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <div className="browser-url">shopkart.com/products</div>
              </div>
              <div className="mockup-browser-body">
                <div className="mockup-nav">
                  <span className="mockup-nav-logo">ShopKart</span>
                  <div className="mockup-nav-links">
                    <span>Products</span>
                    <span>Best Sellers</span>
                    <span>New Arrivals</span>
                    <span>Deals</span>
                  </div>
                </div>
                <div className="mockup-grid">
                  <div className="mockup-card">
                    <div className="mockup-card-img" style={{ backgroundImage: `url(${productsData[0].image})` }}></div>
                    <div className="mockup-card-title">Wireless Headphones</div>
                    <div className="mockup-card-price">₹7999.00</div>
                    <button className="mockup-card-btn">Add to Cart</button>
                  </div>
                  <div className="mockup-card">
                    <div className="mockup-card-img" style={{ backgroundImage: `url(${productsData[1].image})` }}></div>
                    <div className="mockup-card-title">Smart Watch</div>
                    <div className="mockup-card-price">₹4999.00</div>
                    <button className="mockup-card-btn">Add to Cart</button>
                  </div>
                  <div className="mockup-card">
                    <div className="mockup-card-img" style={{ backgroundImage: `url(${productsData[8].image})` }}></div>
                    <div className="mockup-card-title">Office Chair</div>
                    <div className="mockup-card-price">₹12999.00</div>
                    <button className="mockup-card-btn">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Info Badges Section */}
      <section className="info-badges-section">
        <div className="info-badges-container container">
          <div className="info-badge-card">
            <div className="badge-icon-wrapper">
              <Truck className="badge-icon" size={24} />
            </div>
            <div className="badge-text-wrapper">
              <h3>Free Shipping</h3>
              <p>On all orders over ₹1000</p>
            </div>
          </div>
          <div className="info-badge-card">
            <div className="badge-icon-wrapper">
              <ShieldCheck className="badge-icon" size={24} />
            </div>
            <div className="badge-text-wrapper">
              <h3>Secure Payment</h3>
              <p>100% secure checkout</p>
            </div>
          </div>
          <div className="info-badge-card">
            <div className="badge-icon-wrapper">
              <Headphones className="badge-icon" size={24} />
            </div>
            <div className="badge-text-wrapper">
              <h3>24/7 Support</h3>
              <p>Get help whenever you need</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories Section */}
      <section className="categories-section">
        <div className="categories-container container">
          <div className="categories-header">
            <div className="categories-header-left">
              <h2>Featured Categories</h2>
              <p>Explore our most popular collections designed for the modern home and workplace.</p>
            </div>
            <Link to="/products" className="view-all-link">
              View All Categories <ArrowRight size={16} />
            </Link>
          </div>

          <div className="categories-grid">
            <div className="category-card category-electronics">
              <div className="category-image-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop&q=60")' }}></div>
              <div className="category-card-content">
                <p className="category-tag">Smart Tech</p>
                <h3>Electronics</h3>
                <Link to="/products?category=Electronics" className="category-btn">Shop Collection</Link>
              </div>
            </div>
            <div className="category-card category-accessories">
              <div className="category-image-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60")' }}></div>
              <div className="category-card-content">
                <p className="category-tag">Daily Gear</p>
                <h3>Accessories</h3>
                <Link to="/products?category=Accessories" className="category-btn">Explore</Link>
              </div>
            </div>
            <div className="category-card category-home-kitchen large">
              <div className="category-image-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80")' }}></div>
              <div className="category-card-content">
                <h3>Home & Kitchen</h3>
                <p>Redefine your living space with minimalist utility.</p>
                <Link to="/products?category=Home%20%26%20Kitchen" className="category-btn">Browse Products</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Limited Time Offer Banner */}
      <section className="promo-section">
        <div className="promo-container container">
          <div className="promo-banner-card">
            <div className="promo-content">
              <h2>Limited Time Offer</h2>
              <p>Get up to <strong>40% OFF</strong> on selected electronics and home appliances. Offer ends this weekend!</p>

              <div className="promo-countdown">
                <div className="countdown-box">
                  <span className="number">{formatTime(timeLeft.days)}</span>
                  <span className="label">Days</span>
                </div>
                <div className="countdown-box">
                  <span className="number">{formatTime(timeLeft.hours)}</span>
                  <span className="label">Hrs</span>
                </div>
                <div className="countdown-box">
                  <span className="number">{formatTime(timeLeft.minutes)}</span>
                  <span className="label">Mins</span>
                </div>
                <div className="countdown-box">
                  <span className="number">{formatTime(timeLeft.seconds)}</span>
                  <span className="label">Secs</span>
                </div>
              </div>
            </div>
            <div className="promo-action">
              <Link to="/products" className="btn btn-white">Claim Discount</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trending Now (Product Grid) */}
      <section className="trending-section">
        <div className="trending-container container">
          <div className="trending-header">
            <h2>Trending Now</h2>
            <div className="accent-line"></div>
          </div>
          <div className="trending-products-grid">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Stay in the Loop (Newsletter) */}
      <section className="newsletter-section">
        <div className="newsletter-container container">
          <div className="newsletter-card">
            <h2>Stay in the Loop</h2>
            <p>Join 50,000+ shoppers and get exclusive access to new products, early sales, and expert tech reviews.</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-dark">Subscribe</button>
            </form>
            <p className="newsletter-disclaimer">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="footer-section">
        <div className="footer-container container">
          <div className="footer-grid">
            <div className="footer-col brand-col">
              <span className="footer-logo">ShopKart</span>
              <p className="footer-desc">
                Redefining modern retail with quality, reliability, and a focus on customer satisfaction since 2026.
              </p>
              <div className="footer-socials">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <TwitterIcon size={18} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <GithubIcon size={18} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon size={18} />
                </a>
                <a href="https://shopkart-omega-seven.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Website">
                  <Globe size={18} />
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h3>Shop</h3>
              <ul>
                <li><Link to="/products">All Products</Link></li>
                <li><Link to="/products?category=Electronics">Electronics</Link></li>
                <li><Link to="/products?category=Accessories">Accessories</Link></li>
                <li><Link to="/products?category=Home%20%26%20Kitchen">Home & Kitchen</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Company</h3>
              <ul>
                <li><Link to="/">About Us</Link></li>
                <li><Link to="/">Contact</Link></li>
                <li><Link to="/">Privacy Policy</Link></li>
                <li><Link to="/">Terms of Service</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Support</h3>
              <ul>
                <li><Link to="/">FAQ</Link></li>
                <li><Link to="/">Shipping Info</Link></li>
                <li><Link to="/">Returns</Link></li>
                <li><Link to="/">Order Tracking</Link></li>
              </ul>
            </div>
          </div>

          <hr className="footer-divider" />

          <div className="footer-bottom">
            <p className="copyright">&copy; 2026 ShopKart, Inc. All rights reserved.</p>
            <div className="payment-icons">
              <span className="payment-badge">Visa</span>
              <span className="payment-badge">Mastercard</span>
              <span className="payment-badge">Amex</span>
              <span className="payment-badge">Apple Pay</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
