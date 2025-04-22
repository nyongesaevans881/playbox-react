import React from 'react';
import SpideyDialogBox from '../../../components/spideyDialogBox/SpideyDialogBox';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
// import Link from 'react/link';

const NoProducts = () => {
  return (
    <div className=''>
      <div className="relative flex justify-center">
        <div className="absolute -translate-x-40 -translate-y-5">
          <SpideyDialogBox
            text='<span>404</span> No Products found in this realm. Try less filters or a valid product category.'
            imageSrc='https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743931764/pc_tj25og.png'
          />
        </div>
        <img
          className='h-100'
          src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743931764/pc_tj25og.png"
          alt=""
          loading='lazy'
        />
      </div>
      <div className='text-center flex justify-center flex-col items-center'>
        <h1 className='text-secondary text-5xl uppercase font-extrabold'>no products</h1>
        <Link className='text-secondary text-xl flex items-center gap-2 px-4 py-2 mt-4 cursor-pointer' to="/products">
            <FaLongArrowAltLeft />
            All Products
        </Link>
      </div>
    </div>
  );
};

export default NoProducts;