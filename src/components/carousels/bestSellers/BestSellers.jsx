import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductPopup from '../../productsPopup/ProductsPopup';
import { addToCart } from '../../../redux/cartSlice';
import BestSellerCard from '../../bestSellerCard/BestSellerCard';
import toast from 'react-hot-toast';


const BestSellers = () => {
    const arrowRef = useRef(null);
    const dispatch = useDispatch(); // Initialize dispatch
    const [showPopup, setShowPopup] = useState(false);
    const [productID, setProductID] = useState(null);
    const [productCategory, setproductCategory] = useState(null);

    const productsState = useSelector((state) => state.products); // Get all product categories

    // Get all products across different categories
    const allProducts = Object.values(productsState).flat();

    // Filter products where carousels array includes 'bestSellers'
    const bestSellers = allProducts.filter(
        (product) => Array.isArray(product.carousels) && product.carousels.includes('bestSellers')
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
        const product = bestSellers.find((p) => p.productID === id);

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
            <div className="best-seller-header mb-4">
                <img src="/favicon.png" alt="" className='h-10' />
                <h1 className='text-4xl uppercase text-white font-extrabold'>Best <span>Sellers</span></h1>
            </div>
            <div className="best-sellers-carousel-wrapper">
                <Slider ref={arrowRef} {...settings}>
                    {bestSellers.map((gadgetItem, index) => {
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

export default BestSellers;
