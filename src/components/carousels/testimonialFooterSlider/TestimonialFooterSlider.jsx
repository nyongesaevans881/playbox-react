"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import "./TestimonialFooterSlider.css";
import { testimonialsData } from "../../../constants/Testimonials.js";

const TestimonialFooterSlider = () => {
    const arrowRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    const renderStars = (rating) => {
        const totalStars = 5;
        const filledStars = Array(rating)
            .fill(null)
            .map((_, index) => (
                <i
                    key={`filled-${index}`}
                    className="fa fa-star"
                    style={{ color: "#0690f3" }}
                ></i>
            ));
        const emptyStars = Array(totalStars - rating)
            .fill(null)
            .map((_, index) => (
                <i
                    key={`empty-${index}`}
                    className="fa fa-star"
                    style={{ color: "#e4e5e9" }}
                ></i>
            ));
        return [...filledStars, ...emptyStars];
    };

    return (
        <div className="testimonial-slider-wrapper w-full">
            <Slider ref={arrowRef} {...settings} className="testimonial-carousel">
                {testimonialsData.map((testimonial, index) => (
                    <div key={index} className="footer-testimonial-carousel-item">
                        <p>{testimonial.message}</p>
                        <div className="testimonial-carousel-item-footer">
                            <h4>{testimonial.name}</h4>
                            <div className="testimonial-stars">
                                {renderStars(testimonial.rating)}
                            </div>
                            <div className="text-white flex items-center gap-2">
                                <img src="/icons/google.webp" alt="" className="h-5" />
                                <p className="text-sm">Google Review ({testimonial.rating} Stars)</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <div className="testimonial-carousel-buttons">
                <button onClick={() => arrowRef.current.slickPrev()}>
                    <i className="fa fa-chevron-left"></i>
                </button>
                <button onClick={() => arrowRef.current.slickNext()}>
                    <i className="fa fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );
};

export default TestimonialFooterSlider;
