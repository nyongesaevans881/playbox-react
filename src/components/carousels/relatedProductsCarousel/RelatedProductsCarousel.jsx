"use client";

import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './RelatedProductsCarousel.css'
import { addToCart } from '../../../redux/cartSlice';
import ProductPopup from '../../productsPopup/ProductsPopup';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const RelatedProductsCarousel = ({ category }) => {
    const arrowRef = useRef(null);
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const [productID, setProductID] = useState(null);
    const [productCategory, setproductCategory] = useState(null);
    const products = useSelector((state) => state.products[category] || []);

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


    // Filter products with the same category, excluding the current product
    const relatedProducts = products.filter((product) =>
        product.category === category
    ).slice(0, 8); // Limit to 8 related products



    // Handle Add to Cart click
    const handleAddToCart = (id) => {
        const product = relatedProducts.find((p) => p.productID === id);

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
        ],
    };

    return (
        <div className="related-products-section">
            <h3 className="related-products-title font-bold text-5xl">
                <span>Related</span> Products
            </h3>
            <div className="related-products-carousel-wrapper">
                <Slider ref={arrowRef} {...settings}>
                    {relatedProducts.map((product, index) => {
                        const percentageOff = Math.round(
                            ((product.prevPrice - product.nowPrice) / product.prevPrice) * 100
                        );

                        return (
                            <div className="related-product-card" key={index}>
                                <div className="related-product-card-header" onClick={() => handleProductClick(product.productID, product.category)}>
                                    <div className="related-product-platform">
                                        <img src={product.platformIcon} alt={product.platform} />
                                        {product.platform}
                                    </div>
                                    <div className="related-product-badges">
                                        <div className="discount-badge">
                                            {percentageOff}% OFF
                                        </div>
                                        <i className="far fa-heart"></i>
                                    </div>
                                </div>
                                <div className="related-product-image" onClick={() => handleProductClick(product.productID, product.category)}>
                                    <img src={product.mainproductImage} alt={`${product.Title} ${product.SubTitle}`} />
                                </div>
                                <div className="related-product-info" onClick={() => handleProductClick(product.productID, product.category)}>
                                    <h4 className='text-xl font-bold line-clamp-2'>{product.Title}</h4>
                                    <h5>{product.SubTitle}</h5>
                                </div>
                                <div className="related-product-pricing" onClick={() => handleProductClick(product.productID, product.category)}>
                                    <span className="original-price">Ksh. {product.prevPrice.toLocaleString()}</span>
                                    <span className="current-price">Ksh. {product.nowPrice.toLocaleString()}</span>
                                </div>
                                <div className="related-product-actions">
                                    <div className='flex items-center gap-4'>
                                        <button
                                            onClick={() => handleProductClick(product.productID, product.category)}
                                            className='product-list-quick-view'
                                        >
                                            <i className="fa fa-eye"></i>
                                        </button>
                                        <Link
                                            href={`/products/${product.category}/${product.subCategory}/${product.variant}/${product.name}`}
                                            className="outlined-seller-card-button font-bold text-xl cursor-pointer text-gray-600"
                                        >
                                            <i className="fa fa-external-link"></i> Specs
                                        </Link>
                                    </div>
                                    <button
                                        className="border border-gray-600 px-4 py-1 font-bold cursor-pointer text-gray-700 hover:bg-secondary hover:text-white hover:border-secondary"
                                        onClick={() => handleAddToCart(product.productID)}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </Slider>

                <div className="carousel-navigation">
                    <button
                        onClick={() => arrowRef.current.slickPrev()}
                        className="nav-btn prev-btn"
                    >
                        <i className="fa fa-chevron-left"></i>
                    </button>
                    <button
                        onClick={() => arrowRef.current.slickNext()}
                        className="nav-btn next-btn"
                    >
                        <i className="fa fa-chevron-right"></i>
                    </button>
                </div>
            </div>

            {showPopup && <ProductPopup productId={productID} onClose={closePopup} productCategory={productCategory} />}
        </div>
    );
};

export default RelatedProductsCarousel;