"use client";

import React, { useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';
import ProductPopup from '../../productsPopup/ProductsPopup';
import { headphones } from '../../../constants/2-pc/headphones';
import { Heart, ScanEye, ShoppingCart, Star } from 'lucide-react';
import './headphones.css';
import toast from 'react-hot-toast';


const Headphones = () => {
    const arrowRef = useRef(null);
    const dispatch = useDispatch(); // Initialize dispatch
    const [showPopup, setShowPopup] = useState(false);
    const [productID, setProductID] = useState(null);
    const [productCategory, setproductCategory] = useState(null);

    // Handle product click to show popup with product ID
    const handleProductClick = (id, productCategory) => {
        setproductCategory(productCategory)
        setProductID(id);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setProductID(null);
    };

    // Handle Add to Cart click
    const handleAddToCart = (id) => {
        const product = headphones.find((p) => p.productID === id);

        if (product) {
            dispatch(
                addToCart({
                    category: product.category,
                    productId: id,
                    color: product.defaultColor || 'default',
                })
            );
            toast.success('Item added to cart successfully!');
        } else {
            toast.error('Product not found!');
        }
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    return (
        <section className="headphones-headphones-carousel-section relative">
            <Slider ref={arrowRef} {...settings}>
                {headphones.map((item, index) => {
                    const percentageOff = Math.round(((item.prevPrice - item.nowPrice) / item.prevPrice) * 100);

                    return <div className="max-w-70 max-md:max-w-full flex justify-center items-center relative" key={index}>
                        <div className='p-1 bg-gray-100 flex items-center justify-center h-50 w-50 mx-auto absolute top-0 left-10 shadow-md max-md:h-80 max-md:w-80 max-md:left-12'>
                            <img src={item.mainproductImage} alt={item.Title} className='h-80 w-80 object-contain' />
                            <span className='absolute top-5 right-5 text-secondary cursor-pointer'><Heart /></span>
                            <img src={item.platformIcon} alt="headphones" className='absolute bg-secondary p-2 h-15 -bottom-5 -left-5 border-2 border-white' />
                        </div>
                        <div className='w-full h-100 border-2 border-gray-300 mt-15 pb-5 max-md:mt-42'>
                            <div className='-translate-y-4'>
                                <div className='mt-50 mx-4'>
                                    <h1 className='text-gray-600 text-center text-md uppercase font-extrabold line-clamp-2'>{item.Title}</h1>
                                </div>
                                <div>
                                    <div>
                                        <div className='bg-gray-200 flex items-center justify-between px-5 py-1 mt-2'>
                                            <span className='text-md font-bold text-gray-600'>Rating</span>
                                            <div className='flex items-center gap-2 text-amber-400'>
                                                <Star className='h-5' />
                                                <span className='text-md font-bold'>{item.rating}</span>
                                            </div>
                                        </div>
                                        <div className='flex px-5 mt-2 justify-between items-center'>
                                            <span className='text-gray-400 text-sm line-through'>Ksh. {item.prevPrice.toLocaleString()}</span>
                                            <span className='text-secondary text-xl font-bold'>Ksh. {item.nowPrice.toLocaleString()}</span>
                                        </div>
                                        <div className='flex items-center justify-between px-5 mt-4'>
                                            <button
                                                onClick={() => handleProductClick(item.productID, item.category)}
                                                className='text-secondary flex gap-2 items-center py-1 px-2 border-2  hover:bg-secondary hover:text-white font-bold cursor-pointer transition text-sm'
                                            >
                                                <ScanEye />
                                                Quick View
                                            </button>
                                            <button
                                                onClick={() => handleAddToCart(item.productID)}
                                                className='text-sm bg-primary flex px-1 py-1 border-2 border-primary gap-0 font-bold cursor-pointer'
                                            >
                                                <ShoppingCart />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </Slider>

            <div className="absolute bottom-6 -left-105 flex gap-2 max-md:left-60 max-md:-bottom-18">
                <button onClick={() => arrowRef.current.slickPrev()} className="bg-white text-gray-600 w-10 h-10 font-bold cursor-pointer shadow-xl max-md:text-4xl max-md:w-20 max-md:h-20">
                    <i className="fa fa-chevron-left"></i>
                </button>
                <button onClick={() => arrowRef.current.slickNext()} className="bg-white text-gray-600 w-10 h-10 font-bold cursor-pointer shadow-xl max-md:text-4xl max-md:w-20 max-md:h-20">
                    <i className="fa fa-chevron-right"></i>
                </button>
            </div>

            {showPopup && <ProductPopup productId={productID} productCategory={productCategory} onClose={closePopup} />}
        </section>
    );
};

export default Headphones;
