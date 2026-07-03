import { useState } from 'react';
import { productsData } from '../data/ProductsData';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
  // State for search input text
  const [searchTerm, setSearchTerm] = useState('');

  // PREPARATION FOR CATEGORY FILTERING (Next step)
  // State for selected category (default is 'All')
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories from productsData
  const categories = ['All', ...new Set(productsData.map((product) => product.category))];

  // Filter products by title (case-insensitive)
  // (Note: in the future, add category filtering by appending:
  // && (selectedCategory === 'All' || product.category === selectedCategory))
  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="products-page">
      <h1 className="products-title">Our Products</h1>

      {/* Search Bar Container */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Products Grid or Empty State Message */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>No products found.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
