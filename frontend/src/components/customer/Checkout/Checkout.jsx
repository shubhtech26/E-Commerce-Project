import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, CreditCardIcon, TruckIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../../hooks/useCart';
import { useAuth } from '../../../hooks/useAuth';
import { formatCurrency } from '../../../utils';
import { mockUser } from '../../../data/mockData';
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    saveCard: false
  });

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [useNewAddress, setUseNewAddress] = useState(true);

  // Load user data if authenticated
  useEffect(() => {
    if (isAuthenticated && mockUser.addresses.length > 0) {
      setSelectedAddress(mockUser.addresses[0]);
      setUseNewAddress(false);
      setShippingAddress({
        firstName: mockUser.addresses[0].firstName,
        lastName: mockUser.addresses[0].lastName,
        email: mockUser.email,
        phone: mockUser.phone,
        street: mockUser.addresses[0].street,
        city: mockUser.addresses[0].city,
        state: mockUser.addresses[0].state,
        zipCode: mockUser.addresses[0].zipCode,
        country: mockUser.addresses[0].country
      });
    }
  }, [isAuthenticated]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  // Calculations
  const shippingCost = totalPrice >= 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingCost + tax;

  const steps = [
    { id: 1, name: 'Shipping', completed: currentStep > 1 },
    { id: 2, name: 'Payment', completed: currentStep > 2 },
    { id: 3, name: 'Review', completed: false }
  ];

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    
    // Validate shipping form
    const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !shippingAddress[field]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    // Validate payment form
    const requiredFields = ['cardNumber', 'expiryDate', 'cvv', 'cardholderName'];
    const missingFields = requiredFields.filter(field => !paymentInfo[field]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all payment details');
      return;
    }
    
    setCurrentStep(3);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart
      await clearCart();
      
      toast.success('Order placed successfully!');
      navigate('/order-confirmation', { 
        state: { 
          orderNumber: 'ORD-' + Date.now(),
          total: finalTotal,
          items: items.length
        } 
      });
    } catch (error) {
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <nav aria-label="Progress">
        <ol className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className={`h-0.5 w-full ${step.completed ? 'bg-indigo-600' : 'bg-gray-200'}`} />
              </div>
              <button
                onClick={() => step.completed && setCurrentStep(step.id)}
                className={`relative w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  currentStep === step.id
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : step.completed
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-gray-300 bg-white text-gray-500'
                }`}
              >
                {step.completed ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </button>
              <span className={`ml-4 text-sm font-medium ${
                currentStep === step.id ? 'text-indigo-600' : step.completed ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {step.name}
              </span>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );

  const renderShippingStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
        
        {/* Saved Addresses */}
        {isAuthenticated && mockUser.addresses.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Saved Addresses</h3>
            <div className="space-y-3">
              {mockUser.addresses.map((address) => (
                <label key={address._id} className="relative block">
                  <input
                    type="radio"
                    name="savedAddress"
                    checked={selectedAddress?._id === address._id && !useNewAddress}
                    onChange={() => {
                      setSelectedAddress(address);
                      setUseNewAddress(false);
                      setShippingAddress({
                        firstName: address.firstName,
                        lastName: address.lastName,
                        email: mockUser.email,
                        phone: mockUser.phone,
                        street: address.street,
                        city: address.city,
                        state: address.state,
                        zipCode: address.zipCode,
                        country: address.country
                      });
                    }}
                    className="sr-only"
                  />
                  <div className={`border rounded-lg p-4 cursor-pointer ${
                    selectedAddress?._id === address._id && !useNewAddress
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {address.firstName} {address.lastName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.street}, {address.city}, {address.state} {address.zipCode}
                        </p>
                        {address.type && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded capitalize">
                            {address.type}
                          </span>
                        )}
                      </div>
                      {address.isDefault && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                </label>
              ))}
              
              <label className="relative block">
                <input
                  type="radio"
                  name="savedAddress"
                  checked={useNewAddress}
                  onChange={() => setUseNewAddress(true)}
                  className="sr-only"
                />
                <div className={`border rounded-lg p-4 cursor-pointer ${
                  useNewAddress
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <p className="font-medium text-gray-900">+ Add new address</p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* New Address Form */}
        {(useNewAddress || !isAuthenticated) && (
          <form onSubmit={handleShippingSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.firstName}
                  onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.lastName}
                  onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={shippingAddress.email}
                onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={shippingAddress.phone}
                onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address *
              </label>
              <input
                type="text"
                required
                value={shippingAddress.street}
                onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.zipCode}
                  onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <select
                  required
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 font-medium"
            >
              Continue to Payment
            </button>
          </form>
        )}
        
        {!useNewAddress && isAuthenticated && (
          <button
            onClick={() => setCurrentStep(2)}
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 font-medium"
          >
            Continue to Payment
          </button>
        )}
      </div>

      {/* Order Summary */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
            
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg border-t pt-2">
                <span>Total</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>
        
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="1234 5678 9012 3456"
                value={paymentInfo.cardNumber}
                onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <CreditCardIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date *
              </label>
              <input
                type="text"
                required
                placeholder="MM/YY"
                value={paymentInfo.expiryDate}
                onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV *
              </label>
              <input
                type="text"
                required
                placeholder="123"
                value={paymentInfo.cvv}
                onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name *
            </label>
            <input
              type="text"
              required
              value={paymentInfo.cardholderName}
              onChange={(e) => setPaymentInfo({...paymentInfo, cardholderName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="saveCard"
              checked={paymentInfo.saveCard}
              onChange={(e) => setPaymentInfo({...paymentInfo, saveCard: e.target.checked})}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
              Save this card for future purchases
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 font-medium"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 font-medium"
            >
              Review Order
            </button>
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
            
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg border-t pt-2">
                <span>Total</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Order</h2>
        
        {/* Shipping Address Review */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <TruckIcon className="h-5 w-5 mr-2" />
              Shipping Address
            </h3>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              Edit
            </button>
          </div>
          <div className="text-sm text-gray-700">
            <p className="font-medium">{shippingAddress.firstName} {shippingAddress.lastName}</p>
            <p>{shippingAddress.street}</p>
            <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
            <p>{shippingAddress.country}</p>
            {shippingAddress.email && <p className="mt-2">Email: {shippingAddress.email}</p>}
            {shippingAddress.phone && <p>Phone: {shippingAddress.phone}</p>}
          </div>
        </div>

        {/* Payment Method Review */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <CreditCardIcon className="h-5 w-5 mr-2" />
              Payment Method
            </h3>
            <button
              onClick={() => setCurrentStep(2)}
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              Edit
            </button>
          </div>
          <div className="text-sm text-gray-700">
            <p>**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
            <p>{paymentInfo.cardholderName}</p>
            <p>Expires: {paymentInfo.expiryDate}</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item._id} className="flex items-center space-x-4">
                <img
                  src={item.product.images?.[0] || '/images/placeholder.jpg'}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                  <div className="text-sm text-gray-600 space-x-4">
                    {item.color && <span>Color: {item.color}</span>}
                    {item.size && <span>Size: {item.size}</span>}
                    <span>Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="text-lg font-medium text-gray-900">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Order Total */}
          <div className="border-t mt-6 pt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg border-t pt-2">
              <span>Total</span>
              <span>{formatCurrency(finalTotal)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-8">
          <button
            onClick={() => setCurrentStep(2)}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 font-medium"
          >
            Back to Payment
          </button>
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 font-medium disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase securely</p>
        </div>

        {renderStepIndicator()}

        <div className="bg-white rounded-lg shadow-sm p-8">
          {currentStep === 1 && renderShippingStep()}
          {currentStep === 2 && renderPaymentStep()}
          {currentStep === 3 && renderReviewStep()}
        </div>
      </div>
    </div>
  );
};

export default Checkout;