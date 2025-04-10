"use client";

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import ProductDetailsCarousel from '../productDetailsCarousel/ProductDetailsCarousel';
import Snackbar from '../snackHelper/Snackbar';
import './ProductsPopup.css';

const ProductPopup = ({ productId, productCategory, onClose }) => {
  console.log(`productCategory`, productCategory);
  // Ensure products exist before accessing
  const products = useSelector((state) => state.products[productCategory] || []);

  // Check if products is an array before calling find()
  const product = Array.isArray(products) ? products.find((p) => p.productID === productId) : null;
  const [snackbar, setSnackbar] = useState({ visible: false, type: '', message: '' });
  const [selectedColor, setSelectedColor] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!product) {
    return null;
  }

  // Paths to platform icons
  const platformIcons = {
    "PS-5": "/Icons/ps5.png",
    "PS-4": "/Icons/ps4.png",
    "X-Box": "/Icons/x-box.png",
    "Switch": "/Icons/switch.png",
  };

  // Extract unique colors or platforms based on the category
  const uniqueColorsOrPlatforms = product.category === "games"
    ? Object.keys(platformIcons) // Use platforms when category is "games"
    : Array.from(new Set(product.imageColorMap.map((entry) => entry.color)));

  const showSnackbar = (type, message) => {
    setSnackbar({ visible: true, type, message });
  };

  const handleAddToCart = (id) => {
    dispatch(
      addToCart({
        productId: id,
        color: selectedColor || product.defaultColor,
      })
    );
    showSnackbar('success', 'Item added to cart successfully!');
  };

  return (
    <div className="popup-overlay z-999999">
      <div className="popup-container">
        <button className="popup-close mr-4" onClick={onClose}>
          <i className="fa fa-close"></i>
        </button>
        <div className="popup-content">
          <div className="popup-image-section">
            <ProductDetailsCarousel images={product.imageColorMap.map((entry) => entry.image)} />
          </div>
          <div className="popup-info-section">
            <div className="pop-up-header-section">
              <h4 className='font-bold text-3xl text-gray-200 max-md:text-xl'>{product.Title}</h4>
              <h6 className='font-bold capitalize'>{product.brand}</h6>
            </div>
            <p className="product-description">{product.description}</p>
            <div className="product-details-top-specs">
              {product.topSpecs.map((spec, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: spec }} />
              ))}
            </div>

            <div className="product-price">
              <span className="original-price">KSh{product.prevPrice.toLocaleString()}</span>
              <span className="current-price">KSh{product.nowPrice.toLocaleString()}</span>
            </div>

            {product.category !== "games" &&
              <div className="quantity-selector">
                <div className="color-platform-selector">
                  <span className='font-bold text-2xl uppercase'>Select Color :</span>
                  {uniqueColorsOrPlatforms.map((colorOrPlatform, index) => {
                    return <div>
                      <div
                        key={index}
                        className={`color-button ${selectedColor === colorOrPlatform ? 'selected' : ''}`}
                        onClick={() => setSelectedColor(colorOrPlatform)}
                      >
                        <p style={{ backgroundColor: colorOrPlatform }} className="color-circle"></p>
                      </div>
                    </div>
                  })}
                </div>
              </div>
            }



            <div className="product-popup-action-buttons">
              <a href={`/products/${product.category}/${product.subCategory}/${product.variant}/${product.name}`}>
                <button className="moreInfo">
                  More Info <i className="fa fa-external-link"></i>
                </button>
              </a>

              <button>
                Compare <i className="fa fa-balance-scale"></i>
              </button>
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product._id);
                }}
              >
                Add to Cart <i className="fa fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {snackbar.visible && (
        <Snackbar
          type={snackbar.type}
          message={snackbar.message}
          onClose={() => setSnackbar({ visible: false, type: '', message: '' })}
          displayTime={1000}
        />
      )}
    </div>
  );
};

export default ProductPopup;
