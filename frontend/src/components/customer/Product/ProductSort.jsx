import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { SORT_OPTIONS } from '../../../constants';

const ProductSort = ({ currentSort, onSortChange }) => {
  const currentSortLabel = SORT_OPTIONS.find(option => option.value === currentSort)?.label || 'Sort by';

  return (
    <div className="relative inline-block text-left">
      <div className="group">
        <button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {currentSortLabel}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>

        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div className="py-1">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                  currentSort === option.value 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSort;