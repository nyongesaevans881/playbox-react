"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  MinusCircle, 
  Star, 
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const FilterSidebar = ({ 
  products, 
  initialFilters = {}, 
  onFilterChange,
  maxPrice = 80000 
}) => {
  // Initialize filter states with defaults or provided values
  const [priceRange, setPriceRange] = useState([
    initialFilters.price?.min || 0, 
    initialFilters.price?.max || maxPrice
  ]);
  const [selectedStorage, setSelectedStorage] = useState(initialFilters.storage || []);
  const [selectedConditions, setSelectedConditions] = useState(initialFilters.condition || []);
  const [selectedBrands, setSelectedBrands] = useState(initialFilters.brand || []);
  const [ratingFilter, setRatingFilter] = useState(initialFilters.rating || 0);
  const [activeFilters, setActiveFilters] = useState([]);
  const [collapsedSections, setCollapsedSections] = useState({
    price: false,
    storage: false,
    condition: false,
    brand: false,
    rating: false
  });

  // Derive available options from products
  const availableStorages = useMemo(() => {
    const storages = new Set();
    products?.forEach(product => {
      if (product.storage) storages.add(product.storage);
    });
    return Array.from(storages).sort();
  }, [products]);

  const availableConditions = useMemo(() => {
    const conditions = new Set();
    products?.forEach(product => {
      if (product.condition) conditions.add(product.condition);
    });
    return Array.from(conditions).sort();
  }, [products]);

const availableBrands = useMemo(() => {
  const brands = new Set();
  products?.forEach(product => {
    if (product.brand) brands.add(product.brand);
  });
  return Array.from(brands).sort().slice(0, 15);
}, [products]);


  // Update parent component with filter changes
  useEffect(() => {
    const newFilters = {
      price: { min: priceRange[0], max: priceRange[1] },
      storage: selectedStorage,
      condition: selectedConditions,
      brand: selectedBrands,
      rating: ratingFilter
    };
    
    // Track active filters for the "active filters" display
    const active = [];
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) {
      active.push({
        type: 'price',
        label: `Ksh. ${priceRange[0].toLocaleString()} - Ksh. ${priceRange[1].toLocaleString()}`
      });
    }
    
    selectedStorage.forEach(storage => {
      active.push({ type: 'storage', label: storage });
    });
    
    selectedConditions.forEach(condition => {
      active.push({ type: 'condition', label: condition });
    });
    
    selectedBrands.forEach(brand => {
      active.push({ type: 'brand', label: brand });
    });
    
    if (ratingFilter > 0) {
      active.push({ type: 'rating', label: `${ratingFilter}+ Stars` });
    }
    
    setActiveFilters(active);
    onFilterChange(newFilters);
  }, [priceRange, selectedStorage, selectedConditions, selectedBrands, ratingFilter, maxPrice]);

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleStorageToggle = (storage) => {
    setSelectedStorage(prev => 
      prev.includes(storage) 
        ? prev.filter(s => s !== storage) 
        : [...prev, storage]
    );
  };

  const handleConditionToggle = (condition) => {
    setSelectedConditions(prev => 
      prev.includes(condition) 
        ? prev.filter(c => c !== condition) 
        : [...prev, condition]
    );
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };

  const removeFilter = (type, value) => {
    switch(type) {
      case 'price':
        setPriceRange([0, maxPrice]);
        break;
      case 'storage':
        setSelectedStorage(prev => prev.filter(s => s !== value));
        break;
      case 'condition':
        setSelectedConditions(prev => prev.filter(c => c !== value));
        break;
      case 'brand':
        setSelectedBrands(prev => prev.filter(b => b !== value));
        break;
      case 'rating':
        setRatingFilter(0);
        break;
    }
  };

  const resetAllFilters = () => {
    setPriceRange([0, maxPrice]);
    setSelectedStorage([]);
    setSelectedConditions([]);
    setSelectedBrands([]);
    setRatingFilter(0);
  };

  // Calculate percentage for price range slider thumbs
  const minThumbPercent = ((priceRange[0] / maxPrice) * 100);
  const maxThumbPercent = ((priceRange[1] / maxPrice) * 100);
  
  // Handle custom range slider changes
  const handleRangeChange = (e, isMin) => {
    const value = Number(e.target.value);
    if (isMin) {
      setPriceRange([value, Math.max(value, priceRange[1])]);
    } else {
      setPriceRange([Math.min(value, priceRange[0]), value]);
    }
  };

  return (
    <div className="bg-blue-300/50 p-4 md:max-w-xs w-full border-2 border-primary md:block md:mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        {activeFilters.length > 0 && (
          <button 
            onClick={resetAllFilters}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <RefreshCw size={14} className="mr-1" />
            Reset All
          </button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <div 
                key={index} 
                className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
              >
                <span>{filter.label}</span>
                <button 
                  onClick={() => removeFilter(filter.type, filter.label)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <MinusCircle size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Filter */}
      <div className="border-t pt-3 pb-2">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => toggleSection('price')}
        >
          <h3 className="text-md font-semibold text-gray-700">Price</h3>
          {collapsedSections.price ? (
            <ChevronDown size={20} className="text-gray-500" />
          ) : (
            <ChevronUp size={20} className="text-gray-500" />
          )}
        </div>
        
        {!collapsedSections.price && (
          <div className="mt-2 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Ksh. {priceRange[0].toLocaleString()}</span>
              <span>Ksh. {priceRange[1].toLocaleString()}</span>
            </div>
            
            {/* Custom slider */}
            <div className="relative h-6 mt-4">
              <div className="absolute h-1 w-full bg-gray-300 rounded top-1/2 transform -translate-y-1/2"></div>
              <div 
                className="absolute h-1 bg-blue-500 rounded top-1/2 transform -translate-y-1/2"
                style={{
                  left: `${minThumbPercent}%`,
                  width: `${maxThumbPercent - minThumbPercent}%`
                }}
              ></div>
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => handleRangeChange(e, true)}
                className="absolute w-full h-1 opacity-0 cursor-pointer z-10"
              />
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => handleRangeChange(e, false)}
                className="absolute w-full h-1 opacity-0 cursor-pointer z-10"
              />
              <div 
                className="absolute h-4 w-4 bg-white border-2 border-blue-500 rounded-full top-1/2 transform -translate-y-1/2 -translate-x-1/2 shadow cursor-pointer z-20"
                style={{ left: `${minThumbPercent}%` }}
              ></div>
              <div 
                className="absolute h-4 w-4 bg-white border-2 border-blue-500 rounded-full top-1/2 transform -translate-y-1/2 -translate-x-1/2 shadow cursor-pointer z-20"
                style={{ left: `${maxThumbPercent}%` }}
              ></div>
            </div>
            
            <div className="flex space-x-2 mt-2">
              <div className="relative rounded-md shadow-sm flex-1">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), Math.max(Number(e.target.value), priceRange[1])])}
                  className="block w-full rounded-md border-gray-300 pl-2 pr-2 py-1.5 text-sm border focus:border-blue-500 focus:ring-blue-500 text-gray-600 font-bold"
                  placeholder="Min"
                />
              </div>
              <div className="relative rounded-md shadow-sm flex-1">
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([Math.min(priceRange[0], Number(e.target.value)), Number(e.target.value)])}
                  className="block w-full rounded-md border-gray-300 pl-2 pr-2 py-1.5 text-sm border focus:border-blue-500 focus:ring-blue-500 text-gray-600 font-bold"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Storage Filter */}
      {availableStorages.length > 0 && (
        <div className="border-t pt-3 pb-2">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleSection('storage')}
          >
            <h3 className="text-md font-semibold text-gray-700">Storage</h3>
            {collapsedSections.storage ? (
              <ChevronDown size={20} className="text-gray-500" />
            ) : (
              <ChevronUp size={20} className="text-gray-500" />
            )}
          </div>
          
          {!collapsedSections.storage && (
            <div className="mt-2 space-y-2">
              {availableStorages.map((storage) => (
                <label key={storage} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStorage.includes(storage)}
                    onChange={() => handleStorageToggle(storage)}
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">{storage}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Condition Filter */}
      {availableConditions.length > 0 && (
        <div className="border-t pt-3 pb-2">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleSection('condition')}
          >
            <h3 className="text-md font-semibold text-gray-700">Condition</h3>
            {collapsedSections.condition ? (
              <ChevronDown size={20} className="text-gray-500" />
            ) : (
              <ChevronUp size={20} className="text-gray-500" />
            )}
          </div>
          
          {!collapsedSections.condition && (
            <div className="mt-2 space-y-2">
              {availableConditions.map((condition) => (
                <label key={condition} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedConditions.includes(condition)}
                    onChange={() => handleConditionToggle(condition)}
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">{condition}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Brand Filter */}
      {availableBrands.length > 0 && (
        <div className="border-t pt-3 pb-2">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleSection('brand')}
          >
            <h3 className="text-md font-semibold text-gray-700">Brand</h3>
            {collapsedSections.brand ? (
              <ChevronDown size={20} className="text-gray-500" />
            ) : (
              <ChevronUp size={20} className="text-gray-500" />
            )}
          </div>
          
          {!collapsedSections.brand && (
            <div className="mt-2 space-y-2">
              {availableBrands.map((brand) => (
                <label key={brand} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Rating Filter */}
      <div className="border-t pt-3 pb-2">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => toggleSection('rating')}
        >
          <h3 className="text-md font-semibold text-gray-700">Rating</h3>
          {collapsedSections.rating ? (
            <ChevronDown size={20} className="text-gray-500" />
          ) : (
            <ChevronUp size={20} className="text-gray-500" />
          )}
        </div>
        
        {!collapsedSections.rating && (
          <div className="mt-3">
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={`${
                      star <= ratingFilter
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {ratingFilter > 0 ? `${ratingFilter}+ stars` : "Any rating"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;