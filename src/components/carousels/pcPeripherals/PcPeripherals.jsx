"use client";

import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PcPeripherals.css";
import Snackbar from '../../snackHelper/Snackbar';
import ProductPopup from '../../productsPopup/ProductsPopup';
import { addToCart } from '../../../redux/cartSlice';

const PcPeripherals = () => {
    const arrowRef = useRef(null);
    const dispatch = useDispatch(); // Initialize dispatch
    const [showPopup, setShowPopup] = useState(false);
    const [productID, setProductID] = useState(null);
    const [snackbar, setSnackbar] = useState({ visible: false, type: '', message: '' });

    // Handle product click to show popup with product ID
    const handleProductClick = (id) => {
        setProductID(id);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setProductID(null);
    };

    const productsState = useSelector((state) => state.products);

    // Get all products across different categories
    const products = Object.values(productsState).flat();

    // Filter products where carousels array includes 'latestArrivals'
    const pcPeripherals = products.filter(
        (product) => Array.isArray(product.carousels) && product.carousels.includes('pcPeripherals')
    );

    //Show Snackbar
    const showSnackbar = (type, message) => {
        setSnackbar({ visible: true, type, message });
    };

    // Handle Add to Cart click
    const handleAddToCart = (id) => {
        const product = products.find((p) => p.productID === id);

        dispatch(
            addToCart({
                productId: id,
                color: product.defaultColor,
            })
        );
        showSnackbar('success', 'Item added to cart successfully!');
    };


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
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
        <div className="pc-peripheral-carousel-wrapper">
            <Slider ref={arrowRef} {...settings}>
                {pcPeripherals.map((component, index) => {
                    const percentageOff = Math.round(((component.prevPrice - component.nowPrice) / component.prevPrice) * 100);
                    return <div key={index} className="pc-peripheral-carousel-item">
                        <div className="pc-peripheral-carousel-item-head flex items-center justify-between" onClick={() => handleProductClick(component.productID)}>
                            <span className='font-bold'>{percentageOff}% OFF</span>
                            <i className="far fa-heart"></i>
                        </div>
                        <div className="pc-peripheral-carousel-item-img" onClick={() => handleProductClick(component.productID)}>
                            <img src={component.mainproductImage} alt="" />
                        </div>
                        <div className="pc-peripheral-carousel-item-title" onClick={() => handleProductClick(component.productID)}>
                            <h2 className='font-bold text-xl line-clamp-2'>{component.Title}</h2>
                            <h6 className='capitalize'>{component.SubTitle}</h6>
                        </div>
                        <div className="pc-peripheral-carousel-item-price" onClick={() => handleProductClick(component.productID)}>
                            <h6>Ksh. {component.prevPrice.toLocaleString()}</h6>
                            <h3>Ksh. {component.nowPrice.toLocaleString()}</h3>
                        </div>
                        <div className="pc-peripheral-carousel-item-buttons">
                            <div href="#" onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart(component.productID);
                            }}>
                                <i className="fa fa-cart"></i>
                                &nbsp; Add to Cart
                            </div>
                            <div href="#" onClick={() => handleProductClick(component.productID)}>
                                <i className="fa fa-external-link"></i>
                                &nbsp; Specs
                            </div>
                        </div>
                    </div>
                })}
            </Slider>

            <div className="pc-peripheral-carousel-buttons">
                <button onClick={() => arrowRef.current.slickPrev()}>
                    <i className="fa fa-chevron-left"></i>
                </button>
                <button onClick={() => arrowRef.current.slickNext()}>
                    <i className="fa fa-chevron-right"></i>
                </button>
            </div>


            {snackbar.visible && (
                <Snackbar
                    type={snackbar.type}
                    message={snackbar.message}
                    onClose={() => setSnackbar({ visible: false, type: '', message: '' })}
                    displayTime={1000}
                />
            )}

            {showPopup && <ProductPopup productId={productID} onClose={closePopup} />}
        </div>
    );
};

export default PcPeripherals;
