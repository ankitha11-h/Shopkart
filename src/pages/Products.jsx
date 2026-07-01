import { productsData } from '../data/ProductsData';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
  return (
    <div className="products-page">
      <h1 className="products-title">Our Products</h1>
      <div className="products-grid">
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
