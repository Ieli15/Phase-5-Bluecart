import React, { useState, useEffect } from 'react';

const FilterPanel = ({ products, onFilterChange }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    ratingMin: 1,
    ratingMax: 5
  });
  
  const [expanded, setExpanded] = useState(true);

  // Extract unique platforms from products
  const platforms = Array.from(new Set(products.map(p => p.platform).filter(Boolean)));
  const [selectedPlatforms, setSelectedPlatforms] = useState(platforms);
  
  useEffect(() => {
    if (products && products.length > 0) {
      // Find max price for the range
      const maxPrice = Math.max(...products.map(product => product.price || 0)) + 100;
      setFilters(prev => ({
        ...prev,
        priceRange: [0, maxPrice]
      }));
    }
  }, [products]);
  
  // Handle price range change
  const handlePriceChange = (e, index) => {
    const value = parseFloat(e.target.value);
    const newRange = [...filters.priceRange];
    newRange[index] = value;
    
    // Ensure min <= max
    if (index === 0 && value > newRange[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < newRange[0]) {
      newRange[0] = value;
    }
    
    setFilters({
      ...filters,
      priceRange: newRange
    });
  };
  
  // Handle rating filter change
  const handleRatingMinChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters({
      ...filters,
      ratingMin: value > filters.ratingMax ? filters.ratingMax : value
    });
  };
  const handleRatingMaxChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters({
      ...filters,
      ratingMax: value < filters.ratingMin ? filters.ratingMin : value
    });
  };
  
  // Handle platform filter change
  const handlePlatformChange = (platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  // Remove auto-apply filters on change
  // useEffect(() => {
  //   onFilterChange({
  //     ...filters,
  //     platforms: selectedPlatforms
  //   });
  // }, [filters, selectedPlatforms, onFilterChange]);

  // Only apply filters when Apply Filters button is clicked
  const handleFilterChange = () => {
    onFilterChange({
      ...filters,
      platforms: selectedPlatforms
    });
  };
  
  // Toggle panel expansion
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`filter-panel ${expanded ? 'expanded' : 'collapsed'}`} style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <div className="filter-header" onClick={toggleExpand}>
        <h4>
          <i className="fas fa-filter"></i> Filter
        </h4>
        <button className="expand-toggle">
          <i className={`fas fa-chevron-${expanded ? 'up' : 'down'}`}></i>
        </button>
      </div>
      
      {expanded && (
        <div className="filter-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Price Range Filter */}
          <div className="filter-section">
            <h5>Price Range</h5>
            <div className="price-inputs-stacked">
              <div className="input-group">
                <label htmlFor="min-price" className="form-label">From</label>
                <span className="input-group-text">$</span>
                <input
                  id="min-price"
                  type="number"
                  className="form-control min-price"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  min="0"
                />
              </div>
              <div className="input-group" style={{ marginTop: '0.5rem' }}>
                <label htmlFor="max-price" className="form-label">To</label>
                <span className="input-group-text">$</span>
                <input
                  id="max-price"
                  type="number"
                  className="form-control max-price"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  min={filters.priceRange[0]}
                />
              </div>
            </div>
          </div>
          
          {/* Platforms Filter */}
          <div className="filter-section">
            <h5>Platforms</h5>
            {platforms.map(platform => (
              <div className="form-check" key={platform}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`platform-${platform}`}
                  checked={selectedPlatforms.includes(platform)}
                  onChange={() => handlePlatformChange(platform)}
                />
                <label className="form-check-label" htmlFor={`platform-${platform}`}>
                  {platform}
                </label>
              </div>
            ))}
          </div>
          
          {/* Rating Filter */}
          <div className="filter-section">
            <h5>Rating Range</h5>
            <div className="rating-range-inputs-stacked">
              <div className="input-group">
                <label htmlFor="rating-min" className="form-label">Minimum</label>
                <select id="rating-min" className="form-select" value={filters.ratingMin} onChange={handleRatingMinChange}>
                  {[1,2,3,4,5].map(val => <option key={val} value={val}>{val}</option>)}
                </select>
              </div>
              <div className="input-group" style={{ marginTop: '0.5rem' }}>
                <label htmlFor="rating-max" className="form-label">Maximum</label>
                <select id="rating-max" className="form-select" value={filters.ratingMax} onChange={handleRatingMaxChange}>
                  {[1,2,3,4,5].map(val => <option key={val} value={val}>{val}</option>)}
                </select>
              </div>
            </div>
          </div>
          
          {/* Reset/Apply Buttons fixed at bottom */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              className="btn btn-outline-secondary reset-filters-btn"
              onClick={() => {
                setFilters({
                  priceRange: [0, Math.max(...products.map(product => product.price || 0)) + 100],
                  ratingMin: 1,
                  ratingMax: 5
                });
                setSelectedPlatforms(platforms);
              }}
            >
              Reset Filters
            </button>
            <button className="btn btn-primary" onClick={handleFilterChange}>
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
