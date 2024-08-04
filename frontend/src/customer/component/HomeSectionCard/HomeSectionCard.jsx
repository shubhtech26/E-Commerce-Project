import React from 'react';

const HomeSectionCard = ({product}) => {
    return (
        <div className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-2'>
            <div className='h-[13rem] w-[10rem]'>
                <img className='object-cover object-top w-full h-full'
                src={product.imageUrl}
                alt='' />
            </div>
            <div className='p-4'>
                <h3 className='text-sm font-medium'>{product.brand}</h3>
                <p className='font-semibold'>₹ {product.discountedPrice}</p>
                <p className='line-through opacity-50'>₹ {product.price}</p>
                <p className='text-green-600 font-semibold'>{product.discountPersent}% Off</p>
            </div>
        </div>
    );  
};

export default HomeSectionCard;


