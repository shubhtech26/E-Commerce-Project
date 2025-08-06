import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useCart } from '../../../hooks/useCart';
import { formatCurrency, calculateDiscount } from '../../../utils';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const { addToCart } = useCart();

  const discount = calculateDiscount(product.originalPrice, product.price);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await addToCart(product, 1, product.sizes?.[0], product.colors?.[0]);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
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
    <Link
      to={`/product/${product._id}`}
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative overflow-hidden rounded-t-lg">
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          {isWishlisted ? (
            <HeartIconSolid className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-400 hover:text-red-500" />
          )}
        </button>

        {/* Product Image */}
        <div className="aspect-square bg-gray-200 relative">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          )}
          <img
            src={product.images?.[0] || '/images/placeholder.jpg'}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
          
          {/* Quick Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white text-gray-900 px-4 py-2 rounded-md shadow-md hover:bg-gray-50 flex items-center space-x-2"
          >
            <ShoppingBagIcon className="h-4 w-4" />
            <span className="text-sm font-medium">Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        {product.brand && (
          <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
        )}

        {/* Product Name */}
        <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-2">
          {renderStars(product.rating)}
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              product.inStock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>

          {/* Available Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex space-x-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{
                    backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                                   color.toLowerCase() === 'black' ? '#000000' :
                                   color.toLowerCase() === 'gray' ? '#6b7280' :
                                   color.toLowerCase() === 'blue' ? '#3b82f6' :
                                   color.toLowerCase() === 'red' ? '#ef4444' :
                                   color.toLowerCase() === 'green' ? '#10b981' :
                                   color.toLowerCase() === 'yellow' ? '#f59e0b' :
                                   color.toLowerCase() === 'purple' ? '#8b5cf6' :
                                   color.toLowerCase() === 'pink' ? '#ec4899' :
                                   color.toLowerCase() === 'brown' ? '#92400e' :
                                   '#6b7280'
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;