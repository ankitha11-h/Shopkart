import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlistItems');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const isWishlisted = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const addToWishlist = (product) => {
    const isAlreadyInWishlist = wishlistItems.some((item) => item.id === product.id);
    if (!isAlreadyInWishlist) {
      setWishlistItems((prevItems) => [...prevItems, product]);
      toast.success(`${product.title} added to wishlist!`);
    }
  };

  const removeFromWishlist = (productId) => {
    const item = wishlistItems.find((item) => item.id === productId);
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    if (item) {
      toast.info(`${item.title} removed from wishlist`);
    }
  };

  const toggleWishlist = (product) => {
    const isAlreadyInWishlist = wishlistItems.some((item) => item.id === product.id);
    if (isAlreadyInWishlist) {
      setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== product.id));
      toast.info(`${product.title} removed from wishlist`);
    } else {
      setWishlistItems((prevItems) => [...prevItems, product]);
      toast.success(`${product.title} added to wishlist!`);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
