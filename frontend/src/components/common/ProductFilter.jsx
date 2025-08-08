import React from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { filterOptions } from '../../data/mockProducts';

const ProductFilter = ({ 
  category,
  selectedFilters = {},
  onFilterChange,
  className = ''
}) => {
  const [segment, subcategory] = (category || '').split('/');

  const handleFilterChange = (filterType, value) => {
    let newValue;
    
    if (Array.isArray(selectedFilters[filterType])) {
      // Toggle value in array
      newValue = selectedFilters[filterType]?.includes(value)
        ? selectedFilters[filterType].filter(v => v !== value)
        : [...(selectedFilters[filterType] || []), value];
    } else {
      // Toggle single value
      newValue = selectedFilters[filterType] === value ? null : value;
    }

    onFilterChange({
      ...selectedFilters,
      [filterType]: newValue
    });
  };

  const getSizes = () => {
    if (!segment || !subcategory) return [];
    return filterOptions.size[segment]?.[subcategory] || [];
  };

  const isFilterSelected = (filterType, value) => {
    if (!selectedFilters[filterType]) return false;
    
    if (Array.isArray(selectedFilters[filterType])) {
      return selectedFilters[filterType].includes(value);
    }
    if (typeof value === 'object' && value?.value !== undefined) {
      return selectedFilters[filterType] === value.value;
    }
    return selectedFilters[filterType] === value;
  };

  const renderFilterSection = (title, options = [], filterType) => (
    <Disclosure as="div" className="border-b border-gray-200 py-6" defaultOpen={true}>
      {({ open }) => (
        <>
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{title}</span>
              <span className="ml-6 flex items-center">
                {open ? (
                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-6">
            <div className="space-y-4">
              {options.map((option, optionIdx) => {
                const value = typeof option === 'object' ? option.value : option;
                const label = typeof option === 'object' ? option.label : option;
                
                return (
                  <div key={optionIdx} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isFilterSelected(filterType, value)}
                      onChange={() => handleFilterChange(filterType, value)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label className="ml-3 text-sm text-gray-600">
                      {label}
                    </label>
                  </div>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );

  // Only show relevant filters
  const availableFilters = [
    { title: 'Price', type: 'price', options: filterOptions.price },
    { title: 'Color', type: 'color', options: filterOptions.color },
    { title: 'Size', type: 'size', options: getSizes() },
    { title: 'Brand', type: 'brand', options: filterOptions.brand },
    { title: 'Discount', type: 'discount', options: filterOptions.discount },
    { title: 'Rating', type: 'rating', options: filterOptions.rating }
  ].filter(filter => filter.options && filter.options.length > 0);

  return (
    <form className={`${className}`}>
      <h2 className="sr-only">Product filters</h2>
      {availableFilters.map(filter => (
        <React.Fragment key={filter.type}>
          {renderFilterSection(filter.title, filter.options, filter.type)}
        </React.Fragment>
      ))}
    </form>
  );
};

export default ProductFilter;