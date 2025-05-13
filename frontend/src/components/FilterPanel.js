import React, { useState, useEffect } from 'react';

const FilterPanel = ({ products, onFilterChange }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: 0
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
  const handleRatingChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters({
      ...filters,
      rating: value
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

  // Apply filters
  useEffect(() => {
    onFilterChange({
      ...filters,
      platforms: selectedPlatforms
    });
  }, [filters, selectedPlatforms, onFilterChange]);
  
  // Toggle panel expansion
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleFilterChange = () => {
    onFilterChange({
      ...filters,
      platforms: selectedPlatforms
    });
  };
  
  return (
    <div className={`filter-panel ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="filter-header" onClick={toggleExpand}>
        <h4>
          <i className="fas fa-filter"></i> Filter
        </h4>
        <button className="expand-toggle">
          <i className={`fas fa-chevron-${expanded ? 'up' : 'down'}`}></i>
        </button>
      </div>
      
      {expanded && (
        <div className="filter-content">
          {/* Price Range Filter */}
          <div className="filter-section">
            <h5>Price Range</h5>
            <div className="price-inputs">
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control min-price"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  min="0"
                />
              </div>
              <span className="price-separator">to</span>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
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
            <h5>Minimum Rating</h5>
            <div className="rating-slider">
              <input
                type="range"
                className="form-range"
                min="0"
                max="5"
                step="1"
                value={filters.rating}
                onChange={handleRatingChange}
              />
              <div className="rating-value">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i}
                    className={`fas fa-star ${i < filters.rating ? 'filled' : ''}`}
                  ></i>
                ))}
              </div>
            </div>
          </div>
          
          {/* Reset Filters Button */}
          <button
            className="btn btn-outline-secondary reset-filters-btn"
            onClick={() => {
              setFilters({
                priceRange: [0, Math.max(...products.map(product => product.price || 0)) + 100],
                rating: 0
              });
              setSelectedPlatforms(platforms);
            }}
          >
            Reset Filters
          </button>

          {/* Apply Filters Button */}
          <button onClick={handleFilterChange}>Apply Filters</button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
