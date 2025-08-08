import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  HeartIcon,
  ShareIcon,
  CheckIcon,
  ShieldCheckIcon,
  TruckIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { fetchProductById } from '../../../redux/slices/productSlice';
import { useCart } from '../../../hooks/useCart';
import { formatCurrency, calculateDiscount } from '../../../utils';
import { mockReviews } from '../../../data/mockData';
import ProductCard from './ProductCard';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct: product, loading, products } = useSelector((state) => state.product);
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      const firstSize = Array.isArray(product.sizes) ? (product.sizes[0]?.name || '') : '';
      setSelectedSize(firstSize);
      const colorArray = Array.isArray(product.colors) ? product.colors : (product.color ? [product.color] : []);
      setSelectedColor(colorArray[0] || '');
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="text-indigo-600 hover:text-indigo-500"
          >
            Back to products
          </button>
        </div>
      </div>
    );
  }

  const original = product.price ?? 0;
  const sale = product.discountedPrice ?? original;
  const discount = calculateDiscount(original, sale);
  const relatedProducts = Array.isArray(products) ? products.filter(p => 
    p._id !== product._id && 
    ((typeof p.category === 'object' ? p.category?._id : p.category) === (typeof product.category === 'object' ? product.category?._id : product.category) || p.brand === product.brand)
  ).slice(0, 4) : [];

  const handleAddToCart = async () => {
    if (!selectedSize && product.sizes?.length > 0) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor && product.colors?.length > 0) {
      toast.error('Please select a color');
      return;
    }

    try {
      await addToCart(product, quantity, selectedSize, selectedColor);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const handleImageNavigation = (direction) => {
    if (direction === 'prev') {
      setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1);
    } else {
      setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((star) => (
          <StarIconSolid
            key={star}
            className={`h-5 w-5 ${
              rating > star ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const tabs = [
    { id: 'description', name: 'Description' },
    { id: 'specifications', name: 'Specifications' },
    { id: 'reviews', name: `Reviews (${mockReviews.length})` },
    { id: 'shipping', name: 'Shipping & Returns' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gray-500">
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/products')}
                className="text-gray-400 hover:text-gray-500 flex items-center"
              >
                <ChevronRightIcon className="h-4 w-4 mx-2" />
                Products
              </button>
            </li>
            <li>
              {(() => {
                const categorySlug = typeof product.category === 'object' ? (product.category?.name || '') : (product.category || '');
                return (
                  <button 
                    onClick={() => navigate(`/products/${categorySlug}`)}
                    className="text-gray-400 hover:text-gray-500 flex items-center"
                  >
                    <ChevronRightIcon className="h-4 w-4 mx-2" />
                    {categorySlug}
                  </button>
                );
              })()}
            </li>
            <li className="flex items-center">
              <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
              <span className="text-gray-900 capitalize">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Product Images */}
          <div className="mb-8 lg:mb-0">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                 <img
                  src={(Array.isArray(product.images) && product.images[selectedImage]) || product.imageUrl || '/logo192.png'}
                  alt={product.title || 'Product'}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {product.images?.length > 1 && (
                  <>
                    <button
                      onClick={() => handleImageNavigation('prev')}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg"
                    >
                      <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
                    </button>
                    <button
                      onClick={() => handleImageNavigation('next')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg"
                    >
                      <ChevronRightIcon className="h-6 w-6 text-gray-800" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
               {product.images?.length > 1 && (
                <div className="flex space-x-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 ${
                        selectedImage === index ? 'border-indigo-600' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                         alt={`${product.title || 'Product'} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Brand */}
            {product.brand && (
              <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
            )}

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title || product.name}</h1>

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                {renderStars(product.rating)}
                <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
              </div>
              <span className="text-sm text-gray-600">|</span>
              <span className={`text-sm font-medium ${(product.quantity ?? 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(product.quantity ?? 0) > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {formatCurrency(sale)}
              </span>
              {original > sale && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    {formatCurrency(original)}
                  </span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Size Selection */}
            {Array.isArray(product.sizes) && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s._id || s.name}
                      onClick={() => setSelectedSize(s.name)}
                      className={`px-3 py-2 text-sm border rounded-md ${
                        selectedSize === s.name
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {(() => {
              const colorArray = Array.isArray(product.colors) ? product.colors : (product.color ? [product.color] : []);
              return colorArray.length > 0;
            })() && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex space-x-3">
                  {(Array.isArray(product.colors) ? product.colors : (product.color ? [product.color] : [])).map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-sm border rounded-md ${
                        selectedColor === color
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 border border-gray-300 rounded-md min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={(product.quantity ?? 0) <= 0}
                className={`w-full px-8 py-3 text-white font-medium rounded-md ${
                  (product.quantity ?? 0) > 0
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {(product.quantity ?? 0) > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2"
                >
                  {isWishlisted ? (
                    <HeartIconSolid className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5" />
                  )}
                  <span>Wishlist</span>
                </button>
                
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2">
                  <ShareIcon className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 border-t pt-6">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <TruckIcon className="h-5 w-5" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <ArrowPathIcon className="h-5 w-5" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <ShieldCheckIcon className="h-5 w-5" />
                <span>Quality guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <h3>Features</h3>
                <ul>
                  <li>Premium quality materials</li>
                  <li>Comfortable fit</li>
                  <li>Durable construction</li>
                  <li>Easy care instructions</li>
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Brand</dt>
                      <dd className="text-sm text-gray-900">{product.brand}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Category</dt>
                      <dd className="text-sm text-gray-900 capitalize">{product.category}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Available Sizes</dt>
                      <dd className="text-sm text-gray-900">{product.sizes?.join(', ')}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Available Colors</dt>
                      <dd className="text-sm text-gray-900">{product.colors?.join(', ')}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review._id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={review.user.avatar}
                          alt={review.user.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{review.user.name}</h4>
                          <div className="flex items-center space-x-2">
                            {renderStars(review.rating)}
                            {review.verified && (
                              <span className="text-xs text-green-600 flex items-center">
                                <CheckIcon className="h-3 w-3 mr-1" />
                                Verified Purchase
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">{review.title}</h5>
                      <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(review.date).toLocaleDateString()}</span>
                        <span>{review.helpful} people found this helpful</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="prose max-w-none">
                <h3>Shipping Information</h3>
                <p>We offer fast and reliable shipping options:</p>
                <ul>
                  <li>Standard Shipping (5-7 business days): $9.99</li>
                  <li>Express Shipping (2-3 business days): $19.99</li>
                  <li>Overnight Shipping (1 business day): $29.99</li>
                  <li>Free shipping on orders over $100</li>
                </ul>

                <h3>Returns & Exchanges</h3>
                <p>We want you to be completely satisfied with your purchase:</p>
                <ul>
                  <li>30-day return window</li>
                  <li>Items must be in original condition</li>
                  <li>Free returns for defective items</li>
                  <li>Easy online return process</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;