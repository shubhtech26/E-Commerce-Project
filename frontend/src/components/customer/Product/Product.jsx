import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  FunnelIcon, 
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { getProductsByCategory } from '../../../data/mockProducts';
import { SORT_OPTIONS } from '../../../constants';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import ProductSort from './ProductSort';
import Pagination from './Pagination';

const Product = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    rating: '',
    sortBy: 'name_asc',
    page: 1,
    limit: 12
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = useParams();

  // Initialize filters from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const initialFilters = {
      minPrice: urlParams.get('minPrice') || '',
      maxPrice: urlParams.get('maxPrice') || '',
      rating: urlParams.get('rating') || '',
      sortBy: urlParams.get('sortBy') || 'name_asc',
      page: parseInt(urlParams.get('page')) || 1,
      limit: parseInt(urlParams.get('limit')) || 12
    };

    setFilters(initialFilters);
  }, [location.search]);

  // Fetch products when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = getProductsByCategory(category || '');
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      }
    });

    const newUrl = `${location.pathname}?${params.toString()}`;
    if (newUrl !== `${location.pathname}${location.search}`) {
      navigate(newUrl, { replace: true });
    }
  }, [filters, navigate, location]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  const handleSortChange = (sortBy) => {
    setFilters({ ...filters, sortBy, page: 1 });
    setShowSort(false);
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      rating: '',
      sortBy: 'name_asc',
      page: 1,
      limit: 12
    });
  };

  const getPageTitle = () => {
    if (category) {
      return category.split('/').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    return 'All Products';
  };

  // Apply filters and sorting to products
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Apply price filter
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseFloat(filters.maxPrice));
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter(p => p.rating >= parseFloat(filters.rating));
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => (a?.price || 0) - (b?.price || 0));
        break;
      case 'price_desc':
        filtered.sort((a, b) => (b?.price || 0) - (a?.price || 0));
        break;
      case 'name_asc':
        filtered.sort((a, b) => (a?.name || '').localeCompare(b?.name || ''));
        break;
      case 'name_desc':
        filtered.sort((a, b) => (b?.name || '').localeCompare(a?.name || ''));
        break;
      case 'rating_desc':
        filtered.sort((a, b) => (b?.rating || 0) - (a?.rating || 0));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / filters.limit);
  const paginatedProducts = filteredProducts.slice(
    (filters.page - 1) * filters.limit,
    filters.page * filters.limit
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {getPageTitle()}
        </h1>

        <div className="flex items-center">
          <button
            type="button"
            className="text-gray-700 hover:text-gray-900 lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FunnelIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="ml-4 text-gray-700 hover:text-gray-900"
            onClick={() => setShowSort(!showSort)}
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="pt-6 pb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {Object.values(filters).some(v => v !== '') && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear filters
              </button>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {filteredProducts.length} products
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Filters */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
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
                {paginatedProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No products found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Sort menu */}
      {showSort && (
        <ProductSort
          currentSort={filters.sortBy}
          onSort={handleSortChange}
          onClose={() => setShowSort(false)}
        />
      )}
    </div>
  );
};

export default Product;