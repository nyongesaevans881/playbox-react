"use client";

import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './LatestArrivals.css';
import { addToCart } from '../../../redux/cartSlice';
import ProductPopup from '../../productsPopup/ProductsPopup';
import BestSellerCard from '../../bestSellerCard/BestSellerCard'
import toast from 'react-hot-toast';

// Image Imports
const favicon = '/favicon.png'
const arrow = '/graphic/arrow.png'

const LatestArrivals = () => {
    const arrowRef = useRef(null);
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const [productID, setProductID] = useState(null);
    const [productCategory, setproductCategory] = useState(null);

    const productsState = useSelector((state) => state.products);

    // Get all products across different categories
    const allProducts = Object.values(productsState).flat();

    // Filter products where carousels array includes 'latestArrivals'
    const latestArrivals = allProducts.filter(
        (product) => Array.isArray(product.carousels) && product.carousels.includes('latestArrivals')
    );

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
        const product = latestArrivals.find((p) => p.productID === id);

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

    return (
        <section className='best-seller-section-component'>
            <div className="best-seller-header mb-6">
                <img src={favicon} alt="" />
                <h1 className='text-4xl uppercase text-white font-extrabold'><span>Latest</span> Arrivals</h1>
                <img src={arrow} className='arrow' />
            </div>
            <div className="best-sellers-carousel-wrapper">
                <Slider ref={arrowRef} {...settings}>
                    {latestArrivals.map((gadgetItem, index) => {
                        return (
                            <BestSellerCard
                                key={index}
                                product={gadgetItem}
                                handleAddToCart={handleAddToCart}
                                handleProductClick={handleProductClick}
                            />
                        );
                    })}
                </Slider>

                <div className="best-sellers-carousel-buttons">
                    <button onClick={() => arrowRef.current.slickPrev()} className="best-sellers-prev">
                        <i className="fa fa-chevron-left"></i>
                    </button>
                    <button onClick={() => arrowRef.current.slickNext()} className="best-sellers-next">
                        <i className="fa fa-chevron-right"></i>
                    </button>
                </div>
            </div>

            {showPopup && <ProductPopup productId={productID} onClose={closePopup} productCategory={productCategory}/>}

        </section>
    );
};

export default LatestArrivals;
