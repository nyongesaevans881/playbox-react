"use client";

import React, { useRef, useState } from 'react';
import Slider from "react-slick";
import { accessories } from '../../../constants/1-consoles/accessories';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./xboxAccesories.css";
import { Heart, ScanEye, ShoppingCart } from 'lucide-react';


const XboxAccesories = ({ setproductCategory, setProductID, setShowPopup }) => {
    const arrowRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    const handleProductClick = (id, productCategory) => {
        setproductCategory(productCategory)
        setProductID(id);
        setShowPopup(true);
    };


    return (
        <div className="p-2 w-full h-full relative">
            <Slider ref={arrowRef} {...settings}>
                {accessories
                    .filter((component) => component.subCategory === "xbox")
                    .map((component, index) => {

                        return <div key={index} className="bg-white max-w-75 p-4 border-2 border-gray-300 max-md:max-w-full">
                            <div>
                                <span className='text-primary font-semibold text-sm capitalize flex justify-between'>
                                    <span>{component.SubTitle}</span>
                                    <span className='cursor-pointer'><Heart /></span>
                                </span>
                                <h3 className='line-clamp-2 uppercase font-bold text-gray-600'>{component.Title}</h3>
                            </div>
                            <div>
                                <img src={component.mainproductImage} alt={component.Title} className='h-50 w-full object-contain p-2' />
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex flex-col'>
                                    <span className='text-md font-bold text-gray-400 line-through'>Ksh. {component.prevPrice.toLocaleString()}</span>
                                    <span className='text-xl font-bold text-secondary'>Ksh. {component.nowPrice.toLocaleString()}</span>
                                </div>
                                <div className='flex gap-3'>
                                    <button onClick={() => handleProductClick(component.productID, component.category)} className='bg-secondary text-white p-2 rounded-full cursor-pointer' title='Quick View'>
                                        <ScanEye />
                                    </button>
                                    <button className='bg-primary text-white p-2 rounded-full cursor-pointer'>
                                        <ShoppingCart />
                                    </button>
                                </div>
                            </div>
                        </div>
                    })}
            </Slider>

            <div className='max-md:ml-4 max-md:flex max-md: gap-4 max-md:mt-4'>
                <button onClick={() => arrowRef.current.slickPrev()} className='absolute bg-white py-2 px-4 rounded-full top-50 -left-10 z-50 shadow-xl cursor-pointer max-md:static max-md:text-2xl'>
                    <i className="fa fa-chevron-left"></i>
                </button>
                <button onClick={() => arrowRef.current.slickNext()} className='absolute bg-white py-2 px-4 rounded-full top-50 -right-10 z-50 shadow-xl cursor-pointer max-md:static max-md:text-2xl'>
                    <i className="fa fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );
};

export default XboxAccesories;
