import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { fetchProducts } from '../../redux/slices/productSlice';
// import { useCart } from '../../hooks/useCart'; // Removed unused import
// import { formatCurrency } from '../../utils'; // Removed unused import
import MainCarousel from '../../components/common/Carousel';
import ProductCard from '../../components/customer/Product/ProductCard';
import CategoryCard from '../../components/customer/Home/CategoryCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  // const { addToCart } = useCart(); // Removed unused variable

  useEffect(() => {
    dispatch(fetchProducts({ featured: true, limit: 8 }));
  }, [dispatch]);

  const featuredProducts = products.slice(0, 8);

  // Use pinned Unsplash images that are CORS-friendly and stable
  const categories = [
    {
      name: "Men's Fashion",
      image:
      'https://plus.unsplash.com/premium_photo-1669688174622-0393f5c6baa2?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      href: '/products/shirt',
    },
    {
      name: "Women's Fashion",
      image:
        'https://plus.unsplash.com/premium_photo-1689371952452-c88c72464115?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww',
      href: '/products/women_dress',
    },
    {
      name: 'Jeans',
      image:
        'https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amVhbnN8ZW58MHx8MHx8fDA%3D',
      href: '/products/men_jeans',
    },
    {
      name: 'Kurtas',
      image:
        'https://media.istockphoto.com/id/1394757444/photo/middle-east-woman-portrat-confidence.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ag1xSA-nmQF05qJcmmdU8AMB-kzfBLQCtwImgBARHco=',
      href: '/products/mens_kurta',
    },
  ];

  const benefits = [
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Free shipping on orders over $100'
    },
    {
      icon: '🔄',
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: '💎',
      title: 'Quality Guarantee',
      description: 'Premium quality products'
    },
    {
      icon: '🛡️',
      title: 'Secure Payment',
      description: 'Your payment information is safe'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <MainCarousel />

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover our wide range of products across different categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.name} title={cat.name} href={cat.href} image={cat.image} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="mt-4 text-lg text-gray-600">
                Check out our hand-picked selection of premium products
              </p>
            </div>
            <Link
              to="/products"
              className="hidden sm:flex items-center text-indigo-600 hover:text-indigo-500 font-medium"
            >
              View all products
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-500 font-medium"
            >
              View all products
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose ShopZone?</h2>
            <p className="mt-4 text-lg text-gray-600">
              We provide the best shopping experience with these amazing benefits
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Stay Updated with Our Latest Offers
            </h2>
            <p className="mt-4 text-lg text-indigo-200">
              Subscribe to our newsletter and never miss a deal
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                />
                <button className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;