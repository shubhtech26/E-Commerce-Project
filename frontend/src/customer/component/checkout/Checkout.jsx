import React from 'react';
import './checkout.css'; // If you have any additional custom styles

// Static Data
const cartItems = [
  { id: 1, name: 'Product A', quantity: 1, price: 20.00 },
  { id: 2, name: 'Product B', quantity: 2, price: 15.00 },
];

const calculateTotals = () => {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 5.00; // Static shipping cost
  const total = subtotal + shipping;
  return { subtotal, shipping, total };
};

const Checkout = () => {
  const { subtotal, shipping, total } = calculateTotals();

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Order Summary Section */}
        <div className="lg:w-1/2 bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="flex flex-col space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b border-gray-200 py-2">
                <span className="flex-1 text-gray-800">{item.name}</span>
                <span className="flex-none text-gray-600">{item.quantity}</span>
                <span className="flex-none text-gray-600">${item.price.toFixed(2)}</span>
                <span className="flex-none text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold text-gray-800 border-t border-gray-200 pt-4">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-800 border-t border-gray-200 pt-2">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-800 border-t border-gray-200 pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Details and Billing Address Sections */}
        <div className="flex flex-col lg:w-1/2 space-y-8">
          {/* Payment Details Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
            <form className="space-y-4">
              <div className="form-group flex flex-col">
                <label htmlFor="card-name" className="block text-gray-700 font-medium mb-1">Cardholder Name</label>
                <input type="text" id="card-name" name="card-name" required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="form-group flex flex-col">
                <label htmlFor="card-number" className="block text-gray-700 font-medium mb-1">Card Number</label>
                <input type="text" id="card-number" name="card-number" required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="form-group flex flex-col">
                <label htmlFor="expiry-date" className="block text-gray-700 font-medium mb-1">Expiry Date</label>
                <input type="text" id="expiry-date" name="expiry-date" placeholder="MM/YY" required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="form-group flex flex-col">
                <label htmlFor="cvv" className="block text-gray-700 font-medium mb-1">CVV</label>
                <input type="text" id="cvv" name="cvv" required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" />
              </div>
            </form>
          </div>

          {/* Billing Address Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Billing Address</h2>
            <form className="space-y-4">
              <div className="form-group flex flex-col">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
                <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="form-group flex flex-col">
                <label htmlFor="address" className="block text-gray-700 font-medium mb-1">Address</label>
                <input type="text" id="address" name="address" required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="form-group flex flex-col">
                <label htmlFor="city" className="block text-gray-700 font-medium mb-1">City</label>
                <input type="text" id="city" name="city" required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="form-group flex flex-col">
                <label htmlFor="state" className="block text-gray-700 font-medium mb-1">State</label>
                <input type="text" id="state" name="state" required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="form-group flex flex-col">
                <label htmlFor="zip" className="block text-gray-700 font-medium mb-1">Zip Code</label>
                <input type="text" id="zip" name="zip" required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="text-center mt-8">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md mr-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Continue Shopping</button>
        <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">Payment</button>
      </footer>
    </div>
  );
};

export default Checkout;