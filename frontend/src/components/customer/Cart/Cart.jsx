import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrashIcon, PlusIcon, MinusIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../../hooks/useCart';
import { formatCurrency } from '../../../utils';
import { mockProducts } from '../../../data/mockData';
import ProductCard from '../Product/ProductCard';
import toast from 'react-hot-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, updateCartItem, removeFromCart, loading } = useCart();
  const [suggestedProducts] = useState(mockProducts.filter(p => p.featured).slice(0, 4));

  // Shipping cost calculation
  const shippingCost = totalPrice >= 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + shippingCost + tax;

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }

    try {
      await updateCartItem(itemId, newQuantity);
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {totalItems === 0 ? 'Your cart is empty' : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h3>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Cart Items</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={item._id} className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-24 h-24">
                          <img
                            src={item.product.images?.[0] || '/images/placeholder.jpg'}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                <Link 
                                  to={`/product/${item.product._id}`}
                                  className="hover:text-indigo-600"
                                >
                                  {item.product.name}
                                </Link>
                              </h3>
                              
                              {item.product.brand && (
                                <p className="text-sm text-gray-500 mt-1">{item.product.brand}</p>
                              )}

                              {/* Variant Info */}
                              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                                {item.color && (
                                  <span>Color: <span className="font-medium">{item.color}</span></span>
                                )}
                                {item.size && (
                                  <span>Size: <span className="font-medium">{item.size}</span></span>
                                )}
                              </div>

                              {/* Price */}
                              <div className="mt-3">
                                <span className="text-lg font-medium text-gray-900">
                                  {formatCurrency(item.price)}
                                </span>
                                {item.product.originalPrice > item.price && (
                                  <span className="ml-2 text-sm text-gray-500 line-through">
                                    {formatCurrency(item.product.originalPrice)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col items-end space-y-2">
                              <button
                                onClick={() => handleRemoveItem(item._id)}
                                className="text-red-600 hover:text-red-500"
                                title="Remove item"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                              
                              <button
                                className="text-gray-400 hover:text-gray-500"
                                title="Move to wishlist"
                              >
                                <HeartIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                                disabled={loading}
                              >
                                <MinusIcon className="h-4 w-4" />
                              </button>
                              
                              <span className="text-gray-900 font-medium min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              
                              <button
                                onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                                disabled={loading}
                              >
                                <PlusIcon className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Item Total */}
                            <div className="text-lg font-medium text-gray-900">
                              {formatCurrency(item.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  to="/products"
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span className="font-medium">{formatCurrency(totalPrice)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">{formatCurrency(tax)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-medium">
                      <span>Total</span>
                      <span>{formatCurrency(finalTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Banner */}
                {totalPrice < 100 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-800">
                      Add {formatCurrency(100 - totalPrice)} more to get free shipping!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 font-medium"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Proceed to Checkout'}
                </button>

                {/* Security Badge */}
                <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure checkout
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Products */}
        {suggestedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;