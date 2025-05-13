import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import ComparisonTable from './ComparisonTable';

const ProductList = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const navigate = useNavigate();

  // Handle adding product to comparison
  const handleAddToCompare = (product) => {
    // Use product.id as unique key if available, else fallback to title+store
    const getKey = (p) => p.id !== undefined ? p.id : `${p.title}-${p.store}`;
    const productKey = getKey(product);
    if (selectedProducts.some(p => getKey(p) === productKey)) {
      setSelectedProducts(selectedProducts.filter(p => getKey(p) !== productKey));
    } else {
      if (selectedProducts.length < 2) {
        setSelectedProducts([...selectedProducts, product]);
      } else {
        alert('You can only compare 2 products at once');
      }
    }
  };

  // Clear comparison
  const handleClearComparison = () => {
    setSelectedProducts([]);
    setShowComparison(false);
  };

  // Show comparison table or navigate to compare page
  const handleShowComparison = () => {
    if (selectedProducts.length < 2) {
      alert('Please select 2 products to compare');
      return;
    }
    if (selectedProducts.length === 2) {
      navigate('/compare', { state: { products: selectedProducts } });
      return;
    }
    setShowComparison(true);
  };

  // Hide comparison table
  const handleHideComparison = () => {
    setShowComparison(false);
  };

  return (
    <div className="product-list-container">
      {selectedProducts.length > 0 && (
        <div className="comparison-controls">
          <div className="selected-count">
            {selectedProducts.length} {selectedProducts.length === 1 ? 'product' : 'products'} selected
          </div>
          <div className="comparison-buttons">
            <button 
              className="btn btn-primary compare-selected-btn"
              onClick={handleShowComparison}
              disabled={selectedProducts.length < 2}
            >
              Compare Selected
            </button>
            <button
              className="btn btn-outline-secondary clear-selected-btn"
              onClick={handleClearComparison}
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}
      
      {showComparison && (
        <ComparisonTable 
          products={selectedProducts}
          onClose={handleHideComparison}
        />
      )}
      
      <div className="products-grid">
        {products.length === 0 ? (
          <div className="no-products">
            <i className="fas fa-search"></i>
            <p>No products found. Try a different search.</p>
          </div>
        ) : (
          products.map((product, index) => (
            <ProductCard 
              key={product.id !== undefined ? product.id : `${product.title}-${product.store}-${index}`}
              product={product}
              onCompare={handleAddToCompare}
              isSelected={selectedProducts.some(
                p => (p.id !== undefined ? p.id : `${p.title}-${p.store}`) === (product.id !== undefined ? product.id : `${product.title}-${product.store}`)
              )}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
