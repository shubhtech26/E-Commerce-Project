import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { PRICE_RANGES, RATING_FILTERS } from '../../../constants';

const ProductFilters = ({ filters, onFiltersChange, onClearFilters, isMobile = false }) => {
  const categories = [
    { id: 'men', name: "Men's Fashion" },
    { id: 'women', name: "Women's Fashion" },
    { id: 'shoes', name: 'Shoes' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'accessories', name: 'Accessories' },
  ];

  const subcategories = {
    men: ['shirts', 'jeans', 't-shirts', 'jackets', 'suits'],
    women: ['dresses', 'tops', 'pants', 'skirts', 'jackets'],
    shoes: ['sneakers', 'boots', 'sandals', 'formal'],
    electronics: ['headphones', 'phones', 'laptops', 'accessories'],
    accessories: ['bags', 'watches', 'jewelry', 'belts']
  };

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handlePriceRangeChange = (range) => {
    if (range === '1000+') {
      onFiltersChange({
        ...filters,
        minPrice: '1000',
        maxPrice: ''
      });
    } else {
      const [min, max] = range.split('-');
      onFiltersChange({
        ...filters,
        minPrice: min,
        maxPrice: max
      });
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((star) => (
          <StarIcon
            key={star}
            className={`h-4 w-4 ${
              rating > star ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Clear Filters */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          Clear all
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={filters.category === category.id}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="ml-3 text-sm text-gray-700">{category.name}</span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value=""
              checked={filters.category === ''}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <span className="ml-3 text-sm text-gray-700">All Categories</span>
          </label>
        </div>
      </div>

      {/* Subcategories */}
      {filters.category && subcategories[filters.category] && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Subcategory</h4>
          <div className="space-y-2">
            {subcategories[filters.category].map((subcategory) => (
              <label key={subcategory} className="flex items-center">
                <input
                  type="radio"
                  name="subcategory"
                  value={subcategory}
                  checked={filters.subcategory === subcategory}
                  onChange={(e) => handleFilterChange('subcategory', e.target.value)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700 capitalize">{subcategory}</span>
              </label>
            ))}
            <label className="flex items-center">
              <input
                type="radio"
                name="subcategory"
                value=""
                checked={filters.subcategory === ''}
                onChange={(e) => handleFilterChange('subcategory', e.target.value)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="ml-3 text-sm text-gray-700">All</span>
            </label>
          </div>
        </div>
      )}

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => {
            const isSelected = range.value === '1000+' 
              ? filters.minPrice === '1000' && !filters.maxPrice
              : filters.minPrice === range.value.split('-')[0] && filters.maxPrice === range.value.split('-')[1];
            
            return (
              <label key={range.value} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  value={range.value}
                  checked={isSelected}
                  onChange={() => handlePriceRangeChange(range.value)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{range.label}</span>
              </label>
            );
          })}
          <label className="flex items-center">
            <input
              type="radio"
              name="priceRange"
              value=""
              checked={!filters.minPrice && !filters.maxPrice}
              onChange={() => onFiltersChange({ ...filters, minPrice: '', maxPrice: '' })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <span className="ml-3 text-sm text-gray-700">Any Price</span>
          </label>
        </div>

        {/* Custom Price Range */}
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <h5 className="text-xs font-medium text-gray-900 mb-2">Custom Range</h5>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-gray-500 self-center">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Customer Rating</h4>
        <div className="space-y-2">
          {RATING_FILTERS.map((rating) => (
            <label key={rating.value} className="flex items-center">
              <input
                type="radio"
                name="rating"
                value={rating.value}
                checked={filters.rating === rating.value.toString()}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <div className="ml-3 flex items-center space-x-2">
                {renderStars(rating.value)}
                <span className="text-sm text-gray-700">& up</span>
              </div>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="rating"
              value=""
              checked={filters.rating === ''}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <span className="ml-3 text-sm text-gray-700">All Ratings</span>
          </label>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Availability</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => handleFilterChange('inStock', e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-sm text-gray-700">In Stock Only</span>
          </label>
        </div>
      </div>

      {/* Brands (Mock data) */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Brand</h4>
        <div className="space-y-2">
          {['EcoWear', 'FloralFash', 'DenimCo', 'LuxeLeather', 'RunTech', 'ClassicWear', 'YogaFlex', 'SoundTech'].map((brand) => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.brands?.includes(brand) || false}
                onChange={(e) => {
                  const brands = filters.brands || [];
                  const newBrands = e.target.checked
                    ? [...brands, brand]
                    : brands.filter(b => b !== brand);
                  handleFilterChange('brands', newBrands);
                }}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;