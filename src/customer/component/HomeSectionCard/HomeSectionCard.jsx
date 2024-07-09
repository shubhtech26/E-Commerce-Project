import React from 'react';

const HomeSectionCard = ({product}) => {
    return (
        <div className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3'>
            <div className='h-[13rem] w-[10rem]'>
                <img className='object-cover object-top w-full h-full'
                src={product.image}
                alt='' />
            </div>
        <div className='p-4'>
            <h3 className='text-sm font-medium'>{product.name}</h3>
            <p className='text-gray-500 text-sm'>{product.old_price}</p>
        </div>
        </div>
    );  
};

export default HomeSectionCard;


