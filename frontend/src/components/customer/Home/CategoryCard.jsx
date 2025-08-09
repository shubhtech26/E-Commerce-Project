import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ title, href, image }) => {
  const handleImgError = (e) => {
    const img = e.currentTarget;
    const step = Number(img.dataset.errStep || '0');

    // Step 0 → try proxy for hotlink-protected hosts
    if (step === 0 && img.src.startsWith('http')) {
      const withoutProtocol = img.src.replace(/^https?:\/\//, '');
      img.dataset.errStep = '1';
      img.src = `https://images.weserv.nl/?url=${encodeURIComponent(withoutProtocol)}&w=1200&h=1600&fit=cover`;
      return;
    }

    // Step 1 → try a generic Unsplash by category title
    if (step === 1) {
      const query = encodeURIComponent(title.toLowerCase().replace(/[^a-z0-9]+/g, ','));
      img.dataset.errStep = '2';
      img.src = `https://source.unsplash.com/1200x1600/?${query}`;
      return;
    }

    // Step 2 → final fallback to app logo
    img.dataset.errStep = '3';
    img.src = '/logo192.png';
  };
  return (
    <Link
      to={href}
      className="group relative block h-64 sm:h-72 md:h-80 overflow-hidden rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      aria-label={title}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 bg-gray-200"
        loading="lazy"
        onError={handleImgError}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Title & CTA */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="text-white text-xl sm:text-2xl font-semibold drop-shadow-md">
          {title}
        </h3>
        <span className="mt-2 inline-flex items-center text-sm font-medium text-white/90">
          Shop now
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;


