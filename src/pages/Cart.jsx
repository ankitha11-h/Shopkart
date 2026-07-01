import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems } = useCart();

  const groupedCartItems = cartItems.reduce((acc, item) => {
    const found = acc.find((i) => i.id === item.id);
    if (found) {
      found.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>
      {groupedCartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items-list">
            {groupedCartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-price">₹{item.price.toFixed(2)}</p>
                  <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
