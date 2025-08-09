import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { formatCurrency } from '../../../utils';

const Cart = () => {
  const navigate = useNavigate();
  const {
    items,
    totalItems,
    totalPrice,
    updateCartItem,
    removeFromCart,
    clearCart,
  } = useCart();

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartItem(itemId, quantity);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm divide-y">
          {items.map((item) => (
            <div key={item._id} className="p-4 sm:p-6 flex items-center">
              <img
                src={item.product?.imageUrl || item.product?.images?.[0] || '/logo192.png'}
                alt={item.product?.title || item.product?.name || 'Product'}
                className="w-20 h-20 object-cover rounded-md mr-4 sm:mr-6"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                  {item.product?.title || item.product?.name}
                </h3>
                <div className="mt-1 text-sm text-gray-500 space-x-4">
                  {item.color && <span>Color: {item.color}</span>}
                  {item.size && <span>Size: {item.size}</span>}
                </div>
                <div className="mt-3 flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border rounded min-w-[3rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="ml-4 text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="ml-4 sm:ml-6 text-right">
                <div className="text-sm text-gray-500">Price</div>
                <div className="text-base sm:text-lg font-medium text-gray-900">
                  {formatCurrency((item.price ?? item.product?.discountedPrice ?? item.product?.price ?? 0) * item.quantity)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              Checkout
            </button>
            <button
              onClick={() => clearCart()}
              className="w-full bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200"
            >
              Clear Cart
            </button>
            <Link
              to="/products"
              className="block text-center text-indigo-600 hover:text-indigo-500 text-sm"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;