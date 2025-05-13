import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ComparePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products } = location.state || {};

  if (!products || products.length !== 2) {
    return (
      <div className="compare-page-error">
        <h2>Please select exactly 2 products to compare.</h2>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const renderProductDetails = (product) => (
    <div className="compare-product-details">
      <h2>{product.name}</h2>
      <img src={product.image_url} alt={product.name} style={{ maxWidth: '200px' }} />
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Rating:</strong> {product.rating}</p>
      <p><strong>Delivery Cost:</strong> ${product.delivery_cost}</p>
      <p><strong>Payment Mode:</strong> {product.payment_mode}</p>
      <p><strong>MB Score:</strong> {product.mb_score}</p>
      <p><strong>CB Score:</strong> {product.cb_score ? (product.cb_score * 100).toFixed(2) : 'N/A'}</p>
      <p><strong>Platform:</strong> {product.platform ? product.platform : product.store}</p>
      <p><strong>Description:</strong> {product.description || 'No description available.'}</p>
      <h3>User Comments</h3>
      {product.reviews && product.reviews.length > 0 ? (
        <ul>
          {product.reviews.map((review, index) => (
            <li key={index}>
              <p><strong>User:</strong> {review.user}</p>
              <p><strong>Comment:</strong> {review.comment}</p>
              <p><strong>Rating:</strong> {review.rating}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );

  return (
    <div className="compare-page">
      <h1>Compare Products</h1>
      <div className="compare-products-row" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'flex-start' }}>
        {products.map((product, idx) => (
          <div className="compare-product-col" key={idx} style={{ flex: 1, minWidth: 0, maxWidth: 400, background: '#fff', border: '1px solid #eee', borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {renderProductDetails(product)}
          </div>
        ))}
      </div>
      <button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default ComparePage;
