import { useState } from 'react';
import { productsData } from '../data/ProductsData';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
  // State for search input text
  const [searchTerm, setSearchTerm] = useState('');

  // State for selected category (default is 'All')
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories from productsData
  const categories = ['All', ...new Set(productsData.map((product) => product.category))];

  // PREPARATION FOR PRICE SORTING (Next step)
  // State for sort order: '' (default/none), 'price-asc' (low-to-high), 'price-desc' (high-to-low)
  const [sortBy, setSortBy] = useState('');

  // Filter products by both title (case-insensitive) and selected category
  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // (Note: in the future, sort the filtered products before rendering:
  // const sortedProducts = [...filteredProducts].sort((a, b) => {
  //   if (sortBy === 'price-asc') return a.price - b.price;
  //   if (sortBy === 'price-desc') return b.price - a.price;
  //   return 0;
  // });
  // )

  return (
    <div className="products-page">
      <h1 className="products-title">Our Products</h1>

      {/* Category Filter Buttons */}
      <div className="categories-container">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

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
