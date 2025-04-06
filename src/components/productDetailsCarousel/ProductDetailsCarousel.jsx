"use client";

import React, { useState } from 'react';
import './ProductDetailsCarousel.css'

const ProductDetailsCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sliding, setSliding] = useState(false);
    const [slideDirection, setSlideDirection] = useState('');

    const nextImage = () => {
        setSliding(true);
        setSlideDirection('slide-left');
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setSliding(false);
        }, 300); // Match this with your CSS transition duration
    };

    const prevImage = () => {
        setSliding(true);
        setSlideDirection('slide-right');
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
            setSliding(false);
        }, 300); // Match this with your CSS transition duration
    };

    const changeImage = (index) => {
        if (index > currentIndex) {
            setSlideDirection('slide-left');
        } else if (index < currentIndex) {
            setSlideDirection('slide-right');
        }
        setSliding(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setSliding(false);
        }, 300); // Match this with your CSS transition duration
    };

    return (
        <div className='product-details-carousel'>
            <div className="product-details-img-display">
                <button className="nav-button prev-button" onClick={prevImage}>
                    <i className="fa fa-chevron-left"></i>
                </button>
                <div className={`image-container ${sliding ? slideDirection : ''}`}>
                    <img 
                        src={images[currentIndex]} 
                        alt={`product image ${currentIndex + 1}`} 
                        className="product-details-main-image"
                    />
                </div>
                <button className="nav-button next-button" onClick={nextImage}>
                    <i className="fa fa-chevron-right"></i>
                </button>
            </div>
            <div className="product-details-image-select">
                {images.map((image, index) => (
                    <div 
                        key={index} 
                        className={`product-details-image-item ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => changeImage(index)}
                    >
                        <img src={image} alt={`product image ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetailsCarousel;