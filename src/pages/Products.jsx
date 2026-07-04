import { useState } from 'react';
import { productsData } from '../data/ProductsData';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(productsData.map((product) => product.category))];
  const [sortBy, setSortBy] = useState('');

  // State for frontend pagination
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 4;

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

  // Calculate total pages
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  // Slice products for current page
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const displayedProducts = sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  return (
    <div className="products-page">
      <h1 className="products-title">Our Products</h1>

      <div className="categories-container">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
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
              setCurrentPage(1);
            }}
            className="search-input"
          />
        </div>

        <div className="sort-container">
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
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

          {/* Frontend Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                type="button"
                className="pagination-btn prev-btn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className="pagination-pages">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`pagination-page-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="pagination-btn next-btn"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
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
