import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-white">ShopZone</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Your one-stop destination for premium fashion and lifestyle products. 
                Quality guaranteed, customer satisfaction is our priority.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/products/men" className="text-gray-300 hover:text-white transition-colors">
                    Men's Fashion
                  </Link>
                </li>
                <li>
                  <Link to="/products/women" className="text-gray-300 hover:text-white transition-colors">
                    Women's Fashion
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/help/shipping" className="text-gray-300 hover:text-white transition-colors">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link to="/help/returns" className="text-gray-300 hover:text-white transition-colors">
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link to="/help/size-guide" className="text-gray-300 hover:text-white transition-colors">
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link to="/help/faq" className="text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/help/track-order" className="text-gray-300 hover:text-white transition-colors">
                    Track Your Order
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-300">support@shopzone.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-300">New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.281C3.438 14.027 2.892 12.24 2.892 10.362c0-1.878.546-3.665 1.234-5.345.875-.791 2.026-1.281 3.323-1.281 1.297 0 2.448.49 3.323 1.281.688 1.68 1.234 3.467 1.234 5.345 0 1.878-.546 3.665-1.234 5.345-.875.791-2.026 1.281-3.323 1.281z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              &copy; {currentYear} ShopZone. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
 
export default Footer;