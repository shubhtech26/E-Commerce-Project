import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, FavoriteBorder, ShoppingBagOutlined, Favorite } from '@mui/icons-material';
import productData from './ProductData'; // Adjusted import to match the filename

const ProductDetail = () => {
    const [inCart, setInCart] = useState(false);
    const [inFavourites, setInFavourites] = useState(false);
    const [mainImage, setMainImage] = useState(productData[0].mainImage);
    const [selectedColor, setSelectedColor] = useState(productData[0].colors[0]);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (inCart) {
            navigate('/register');
        } else {
            setInCart(true);  
        }
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
                            {productData[0].thumbnails.map((thumbnail, index) => (
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
                            {productData[0].title}
                        </h1>
                        <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                            <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                                ${productData[0].price.toFixed(2)}
                            </p>

                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <div className="flex items-center gap-1">
                                    {[...Array(Math.round(productData[0].rating))].map((_, index) => (
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
                                    ({productData[0].rating.toFixed(1)})
                                </p>
                                <a href="#" className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
                                    {productData[0].reviews} Reviews
                                </a>
                            </div>
                        </div>

                        <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">

                            {/* Add to Favourites */}
                            <a href="#" onClick={handleToggleFavourites}
                                className={`flex items-center justify-center py-2.5 px-5 text-sm font-medium focus:outline-none rounded-lg border ${
                                    inFavourites ? 'text-black border-red-500' : 'text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-primary-700'
                                } focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                                role="button"
                            >
                                {inFavourites ? (
                                    <Favorite className="w-5 h-5 -ms-2 me-2 color-red" />
                                ) : (
                                    <FavoriteBorder className="w-5 h-5 -ms-2 me-2" />
                                )}
                                {inFavourites ? 'Added to favorites' : 'Add to favorites'}
                            </a>


                            {/* Add to cart */}
                            <a href="#" onClick={handleAddToCart}
                                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                role="button"
                            >
                                {inCart ? (
                                    <ShoppingBagOutlined className="w-5 h-5 -ms-2 me-2" />
                                ) : (
                                    <ShoppingCartOutlined className="w-5 h-5 -ms-2 me-2" />
                                )}
                                {inCart ? 'Go to Bag' : 'Add to cart'}
                            </a>
                        </div>

                        <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                         {/* Color selection */}
                         <div className="mt-4">
                            <h2 className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                                Colour
                            </h2>
                            <div className="mt-2 flex space-x-2">
                                {productData[0].colors.map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleColorSelect(color)}
                                        className={`py-2 px-4 border rounded-full ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Description */}
                        <div>
                            <h2 className="text-sm mt-6 font-medium text-gray-900 dark:text-white">
                                Product Description
                            </h2>
                            <p className="mb-6 text-gray-500 dark:text-gray-400">
                                {productData[0].description}
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductDetail;
