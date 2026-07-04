import { useState } from 'react';
import { productsData } from '../data/ProductsData';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(productsData.map((product) => product.category))];

  const [sortBy, setSortBy] = useState('');

  const [visibleCount, setVisibleCount] = useState(4);

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  const displayedProducts = sortedProducts.slice(0, visibleCount);

  return (
    <div className="products-page">
      <h1 className="products-title">Our Products</h1>


      <div className="categories-container">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setVisibleCount(4);
            }}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>


      <div className="controls-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products by title..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(4);
            }}
            className="search-input"
          />
        </div>

        <div className="sort-container">
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setVisibleCount(4);
            }}
            className="sort-select"
          >
            <option value="">Default Sorting</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>


      {displayedProducts.length > 0 ? (
        <>
          <div className="products-grid">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>


          {visibleCount < sortedProducts.length && (
            <div className="load-more-container">
              <button
                type="button"
                className="load-more-btn"
                onClick={() =>
                  setVisibleCount((prev) =>
                    Math.min(prev + 4, sortedProducts.length)
                  )
                }
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="no-products">
          <p>No products found.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
