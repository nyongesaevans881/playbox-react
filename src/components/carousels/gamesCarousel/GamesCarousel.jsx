"use client";

import { React, useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carouselStyle.css";
import { useSelector } from 'react-redux';
import { Heart, ScanEye, ShoppingCart } from 'lucide-react';
import ProductPopup from '../../productsPopup/ProductsPopup';

const GamesCarousel = ({ setproductCategory, setProductID, setShowPopup }) => {
    const arrowRef = useRef(null);
    const allProducts = useSelector((state) => state.products["games"] || []);
    const VideoGames = allProducts.filter((product) => product.carousels.includes('indexGames'));

    // Handle product click to show popup with product ID
    const handleProductClick = (id, productCategory) => {
        setproductCategory(productCategory)
        setProductID(id);
        setShowPopup(true);
    };

    // Handle Add to Cart click
    const handleAddToCart = (id) => {
        const product = VideoGames.find((p) => p.productID === id);

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
        autoplaySpeed: 3000,
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
        <section className="carousel-component-section max-md:mx-4">
            <h1 className="carousel-component-heading uppercase">
                Latest <span className="gradient-text">Console</span><br /><span className="gradient-text">& PC</span> Video Games
            </h1>

            <div className="carousel-component-wrapper">
                <Slider ref={arrowRef} {...settings}>
                    {VideoGames.map((game, index) => (
                        <div key={index} className="carousel-component-item max-md:w-full max-md:mx-2">
                            <div className="games-carousel-header">
                                <h3 className='text-gray-500 flex items-center gap-4 justify-between mb-4'>
                                    <span className='text-left text-md line-clamp-2 leading-tight'>{game.Title}</span>
                                    <img src={game.platformIcon} alt="" className='h-10 bg-secondary p-1' />
                                </h3>
                            </div>
                            <div className="games-carousel-image cursor-pointer" onClick={() => handleProductClick(game.productID, game.category)}>
                                <img src={game.mainproductImage} alt={game.Title} className="game-image" />
                            </div>
                            <div className="games-carousel-specs">
                                <div className="games-carousel-specs-item">
                                    <h4 className='text-gray-200'>Available on:</h4>
                                    <h3 className='capitalize'>{game.variant}</h3>
                                </div>
                                <div className="games-carousel-specs-item">
                                    <h4 className='text-gray-200'>Rating:</h4>
                                    <h3>{game.rating}</h3>
                                </div>
                            </div>
                            <div className="games-carousel-footer">
                                <div className="games-carousel-price">
                                    <h4 className='text-gray-100'>Ksh. {game.prevPrice.toLocaleString()}</h4>
                                    <h3 className='text-secondary font-bold'>Ksh. {game.nowPrice.toLocaleString()}</h3>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <div className='flex gap-4'>
                                        <Heart className='text-secondary font-bold p-1 border-1 cursor-pointer' />
                                        <ScanEye onClick={() => handleProductClick(game.productID, game.category)} className='text-secondary font-bold p-1 border-1 cursor-pointer' />
                                    </div>
                                    <button onClick={() => handleAddToCart(game.productID)} className='flex items-center gap-1 px-2 py-1 text-secondary font-bold p-1 border-1 cursor-pointer text-sm'>
                                        <ShoppingCart className='h-4' />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                            <p className='font-bold text-gray-400 mt-4'>— {game.platform} —</p>
                        </div>
                    ))}
                </Slider>

                <div className="carousel-component-buttons">
                    <button onClick={() => arrowRef.current.slickPrev()}>
                        <i className="fa fa-chevron-left"></i>
                    </button>
                    <button onClick={() => arrowRef.current.slickNext()}>
                        <i className="fa fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default GamesCarousel;
