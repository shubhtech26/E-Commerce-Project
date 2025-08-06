import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBagIcon,
  UserIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../../hooks/useAuth';
import { useCart } from '../../../hooks/useCart';

const categories = {
  women: {
    name: 'Women',
    sections: [
      {
        name: 'Clothing',
        items: [
          { name: 'Tops', href: '/products/women/tops' },
          { name: 'Dresses', href: '/products/women/dresses' },
          { name: 'Pants', href: '/products/women/pants' },
          { name: 'Denim', href: '/products/women/denim' },
          { name: 'Sweaters', href: '/products/women/sweaters' },
          { name: 'T-Shirts', href: '/products/women/t-shirts' },
        ],
      },
      {
        name: 'Shoes',
        items: [
          { name: 'Sneakers', href: '/products/women/shoes/sneakers' },
          { name: 'Flats', href: '/products/women/shoes/flats' },
          { name: 'Heels', href: '/products/women/shoes/heels' },
          { name: 'Boots', href: '/products/women/shoes/boots' },
        ],
      },
    ],
  },
  men: {
    name: 'Men',
    sections: [
      {
        name: 'Clothing',
        items: [
          { name: 'Shirts', href: '/products/men/shirts' },
          { name: 'Pants', href: '/products/men/pants' },
          { name: 'Denim', href: '/products/men/denim' },
          { name: 'T-Shirts', href: '/products/men/t-shirts' },
          { name: 'Jackets', href: '/products/men/jackets' },
        ],
      },
      {
        name: 'Shoes',
        items: [
          { name: 'Sneakers', href: '/products/men/shoes/sneakers' },
          { name: 'Loafers', href: '/products/men/shoes/loafers' },
          { name: 'Boots', href: '/products/men/shoes/boots' },
          { name: 'Athletic', href: '/products/men/shoes/athletic' },
        ],
      },
    ],
  },
};

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isAuthenticated, user } = useAuth();
  const { totalItems } = useCart();

  // Close dropdown when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleDropdownClick = (category) => {
    setActiveDropdown(activeDropdown === category ? null : category);
  };

  return (
    <>
      {/* Top banner */}
      <div className="bg-gray-900 text-white py-2 px-4 text-center text-sm fixed top-0 left-0 right-0 z-[100]">
        Get free delivery on orders over $100
      </div>

      {/* Main navbar */}
      <nav className="bg-white shadow-lg fixed top-8 left-0 right-0 z-[100]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-gray-900">ShopZone</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex lg:space-x-8" ref={dropdownRef}>
              {Object.entries(categories).map(([key, category]) => (
                <div
                  key={key}
                  className="relative"
                >
                  <button 
                    className={`text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center ${activeDropdown === key ? 'text-indigo-600' : ''}`}
                    onClick={() => handleDropdownClick(key)}
                  >
                    {category.name}
                    <ChevronDownIcon className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === key && (
                    <div 
                      className="absolute left-0 mt-2 w-screen max-w-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 rounded-lg overflow-hidden z-[110]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-4">
                        {category.sections.map((section) => (
                          <div key={section.name} className="mb-6 last:mb-0">
                            <h3 className="text-sm font-medium text-gray-900 mb-3 px-2">
                              {section.name}
                            </h3>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                              {section.items.map((item) => (
                                <li key={item.name} className="relative">
                                  <Link
                                    to={item.href}
                                    className="block text-sm text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-2 py-2 rounded transition-colors duration-150 cursor-pointer"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setActiveDropdown(null);
                                      window.location.href = item.href;
                                    }}
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-6">
              {/* Search */}
              <button
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setSearchOpen(true)}
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>

              {/* Cart */}
              <Link to="/cart" className="text-gray-700 hover:text-gray-900 relative">
                <ShoppingBagIcon className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative">
                {isAuthenticated ? (
                  <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                    <UserIcon className="h-6 w-6" />
                    <span className="text-sm font-medium">{user?.name}</span>
                  </Link>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/auth/login"
                      className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
                    >
                      Create account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 max-w-3xl mx-auto mt-20 rounded-lg">
            <div className="flex items-center border-b border-gray-300 pb-4">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="ml-2 flex-1 outline-none"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
            {/* Search results would go here */}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;