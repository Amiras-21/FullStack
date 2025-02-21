"use client";

import React from 'react';


const CategoryCard = () => {
    return (
      <div className='bg-white'>
     
      <div className="grid grid-cols-4 divide-x-1 border border-[#F5F5F5] text-center bg-[#F5F5F5] ">
              <div className="flex flex-col items-center justify-center p-4 my-4  h-20 text-gray-600 font-semibold">
                Hi
                <a href="#" className="text-[#1447E6] font-normal">Sign In</a>
              </div>
              <div className="flex flex-col items-center justify-center p-4 my-4 h-20 text-gray-600 font-semibold">
                Save 35% Today
                <a href="#" className="text-[#1447E6] font-normal">Set up Autoship</a>
              </div>
              <div className="flex flex-col items-center justify-center p-4 my-4 h-20 text-gray-600 font-semibold">
                Recent Order
                <a href="#" className="text-[#1447E6] font-normal">Track Package</a>
              </div>
              <div className="flex flex-col items-center justify-center p-4 my-4 h-20 text-gray-600 font-semibold">
                Chewy Pharmacy
                <a href="#" className="text-[#1447E6] font-normal">Shop Now</a>
              </div>
            </div>
            </div>
            
    );
  };
  
  export default CategoryCard;
  