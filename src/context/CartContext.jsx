import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    toast.success(`${product.title} added to cart!`);
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find((item) => item.id === productId);

    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );

    if (item) {
      toast.info(`${item.title} removed from cart`);
    }
  };

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const product = prevItems.find((item) => item.id === productId);
      if (product) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  const decreaseQuantity = (productId) => {
    const productCount = cartItems.filter((item) => item.id === productId).length;
    const removedItem = cartItems.find((item) => item.id === productId);

    if (removedItem) {
      setCartItems((prevItems) => {
        const index = prevItems.findIndex((item) => item.id === productId);
        if (index === -1) return prevItems;
        const newItems = [...prevItems];
        newItems.splice(index, 1);
        return newItems;
      });

      if (productCount === 1) {
        toast.info(`${removedItem.title} removed from cart`);
      }
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
