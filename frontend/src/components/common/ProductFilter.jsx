import React from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
// Backend-driven filters. The parent passes `availableFilters` from API `/api/products/filters`.

const ProductFilter = ({ 
  category,
  selectedFilters = {},
  onFilterChange,
  availableFilters = {},
  className = ''
}) => {
  // category path can be like "men/shirt"; we don't currently use segments here

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'priceRange') {
      // value is [min,max]
      onFilterChange({
        ...selectedFilters,
        priceRange: value,
      });
      return;
    }

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
    if (Array.isArray(availableFilters.sizes)) return availableFilters.sizes;
    return [];
  };

  const isFilterSelected = (filterType, value) => {
    if (!selectedFilters[filterType]) return false;
    
    if (Array.isArray(selectedFilters[filterType])) {
      return selectedFilters[filterType].includes(value);
    }
    if (filterType === 'priceRange' && Array.isArray(value)) {
      const current = selectedFilters.priceRange || [];
      return current.length === 2 && current[0] === value[0] && current[1] === value[1];
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
  // Build price buckets from range
  const priceOptions = (() => {
    if (!availableFilters.priceRange || availableFilters.priceRange.length !== 2) return [];
    const [min, max] = availableFilters.priceRange;
    const step = Math.max(1, Math.round((max - min) / 3));
    const buckets = [
      [min, min + step],
      [min + step + 1, min + 2 * step],
      [min + 2 * step + 1, max],
    ];
    return buckets.map(([a, b]) => ({ label: `${a} - ${b}`, value: [a, b] }));
  })();

  // Discount buckets (percentage or greater)
  const discountOptions = [10, 20, 30, 40].map((d) => ({ label: `${d}% and above`, value: d }));

  // Availability options
  const availabilityOptions = [{ label: 'In stock only', value: true }];

  const filtersList = [
    { title: 'Price', type: 'priceRange', options: priceOptions },
    { title: 'Color', type: 'color', options: availableFilters.colors || [] },
    { title: 'Size', type: 'size', options: getSizes() },
    { title: 'Brand', type: 'brand', options: availableFilters.brands || [] },
    { title: 'Discount', type: 'discount', options: discountOptions },
    { title: 'Availability', type: 'inStock', options: availabilityOptions }
  ].filter(filter => filter.options && filter.options.length > 0);

  return (
    <form className={`${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-gray-900">Product filters</h2>
        <button
          type="button"
          onClick={() => onFilterChange({})}
          className="text-xs text-indigo-600 hover:text-indigo-500"
        >
          Clear all
        </button>
      </div>
      {filtersList.map(filter => (
        <React.Fragment key={filter.type}>
          {renderFilterSection(filter.title, filter.options, filter.type)}
        </React.Fragment>
      ))}
    </form>
  );
};

export default ProductFilter;