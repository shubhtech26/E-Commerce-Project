import React from 'react';
import { useEffect, useState } from 'react';
import { ShoppingCartOutlined, FavoriteBorder, ShoppingBagOutlined, Favorite } from '@mui/icons-material';


const ProductDetail = () => {

    const [product, setProduct] = useState(null);
    const [inCart, setInCart] = useState(false);
    const [inFavourites, setInFavourites] = useState(false);
    const [mainImage, setMainImage] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const thumbnails = [
        "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
        "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-side.svg",
        "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-back.svg"
      ];

    useEffect(() => {
    // Fetch product details
    fetch('frontend/src/customer/component/Product/product.json')
        .then(response => response.json())
        .then(data => {
        setProduct(data);
        setMainImage(data.mainImage);
        setSelectedColor(data.colors[0]);
        });
    }, []);

    const handleToggleAddToCart = () => {
        setInCart(!inCart);
    };
    const handleToggleFavourites = () => {
        setInFavourites(!inFavourites);
    };
    const handleThumbnailClick = (image) => {
        setMainImage(image);
      };
    const handleColorSelect = (color) => {
    setSelectedColor(color);
    };

    if (!product) {
        return <div>Loading...</div>;
      }

    return ( 
        <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="container mx-auto px-4">
                {/* Main image container */}
                <div className="max-w-md lg:max-w-lg mx-auto">
                    <img className="w-full dark:hidden" src={mainImage} alt="Main Product Image" />
                </div>
                
                {/* Thumbnails container */}
                <div className="mt-6 flex justify-center space-x-6 mx-auto">
                    {thumbnails.map((thumbnail, index) => (
                    <div
                        key={index}
                        className="w-24 h-20 flex items-center justify-center rounded-lg p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] cursor-pointer"
                        onClick={() => handleThumbnailClick(thumbnail)}
                    >
                        <img className="w-full h-full dark:hidden" src={thumbnail} alt={`Thumbnail ${index + 1}`} />
                    </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {product.title}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                    ${product.price.toFixed(2)}
                </p>

                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                    {[...Array(Math.round(product.rating))].map((_, index) => (
                        <svg
                        key={index}
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                        </svg>
                    ))}
                    </div>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  ({product.rating.toFixed(1)})
                </p>
                <a
                  href="#"
                  className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                >
                  {product.reviews} Reviews
                </a>
              </div>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
            <a href="#" onClick={handleToggleFavourites}
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium focus:outline-none rounded-lg border ${
                    inFavourites ? 'text-white border-red-500 hover:bg-red-600' : 'text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-primary-700'} 
                    focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700}"
                role="button" >
                {inFavourites ? (
                  <Favorite className="w-5 h-5 -ms-2 me-2 color-red" />
                ) : (
                  <FavoriteBorder className="w-5 h-5 -ms-2 me-2" />
                )}
                {inFavourites ? 'Added to favorites' : 'Add to favorites'}
            </a>

                <a href="#" onClick={handleToggleAddToCart}
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                role="button">
                    { inCart ? (
                        <ShoppingBagOutlined className="w-5 h-5 -ms-2 me-2" />     
                    ) : (
                        <ShoppingCartOutlined className="w-5 h-5 -ms-2 me-2" />
                    )}
                    { inCart ? 'Go to Bag' : 'Add to cart'}
                </a>
                           
               
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p className="mb-6 text-gray-500 dark:text-gray-400">
                Studio quality three mic array for crystal clear calls and voice
                recordings. Six-speaker sound system for a remarkably robust and
                high-quality audio experience. Up to 256GB of ultrafast SSD storage.
            </p>

            <p className="text-gray-500 dark:text-gray-400">
                Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
                Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
                Magic Keyboard or Magic Keyboard with Touch ID.
            </p>
            </div>
        </div>
        </div>
  </section>
     );
}
 
export default ProductDetail;