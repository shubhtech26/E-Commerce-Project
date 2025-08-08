import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  FunnelIcon, 
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { getProducts, getFilters, applyFilters, sortProducts } from '../../../services/productService';
import ProductCard from './ProductCard';
import ProductFilter from '../../common/ProductFilter';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const sortOptions = [
  { name: 'Price: Low to High', value: 'price_asc' },
  { name: 'Price: High to Low', value: 'price_desc' },
  { name: 'Rating: High to Low', value: 'rating_desc' },
  { name: 'Name: A to Z', value: 'name_asc' },
  { name: 'Name: Z to A', value: 'name_desc' },
];

const Product = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: null,
    size: [],
    color: null,
    sortBy: 'price_asc'
  });
  const [availableFilters, setAvailableFilters] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const { category } = useParams();

  // Initialize filters from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const initialFilters = {
      priceRange: urlParams.get('price')?.split(',').map(Number),
      size: urlParams.get('size')?.split(',').filter(Boolean) || [],
      color: urlParams.get('color') || null,
      sortBy: urlParams.get('sortBy') || 'price_asc'
    };

    setFilters(initialFilters);
  }, [location.search]);

  // Fetch products and available filters when category changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [items, filtersData] = await Promise.all([
          getProducts(category),
          getFilters(category)
        ]);
        setProducts(items);
        setAvailableFilters(filtersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [category]);

  // Apply filters and sorting when products or filters change
  useEffect(() => {
    let result = [...products];
    
    // Apply filters
    result = applyFilters(result, filters);
    
    // Apply sorting
    result = sortProducts(result, filters.sortBy);
    
    setFilteredProducts(result);
  }, [products, filters]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value) && value.length > 0) {
          params.set(key, value.join(','));
        } else if (!Array.isArray(value) && value !== null) {
          params.set(key, value.toString());
        }
      }
    });

    const newUrl = `${location.pathname}?${params.toString()}`;
    if (newUrl !== `${location.pathname}${location.search}`) {
      navigate(newUrl, { replace: true });
    }
  }, [filters, navigate, location]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (sortBy) => {
    setFilters({ ...filters, sortBy });
    setShowSort(false);
  };

  const getPageTitle = () => {
    if (!category) return 'All Products';
    
    return category
      .split('/')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Filters */}
                  <ProductFilter
                    category={category}
                    selectedFilters={filters}
                    onFilterChange={handleFilterChange}
                    availableFilters={availableFilters}
                    className="px-4"
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{getPageTitle()}</h1>

            <div className="flex items-center">
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    onClick={() => setShowSort(!showSort)}
                  >
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {showSort && (
                  <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSortChange(option.value)}
                          className={`block px-4 py-2 text-sm ${
                            filters.sortBy === option.value ? 'font-medium text-gray-900' : 'text-gray-500'
                          } hover:bg-gray-50 w-full text-left`}
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div className="hidden lg:block">
                <ProductFilter
                  category={category}
                  selectedFilters={filters}
                  onFilterChange={handleFilterChange}
                  availableFilters={availableFilters}
                />
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                ) : (
                  <>
                    {filteredProducts.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No products found</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {filteredProducts.map((product) => (
                          <ProductCard key={product._id || product.id} product={product} />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Product;