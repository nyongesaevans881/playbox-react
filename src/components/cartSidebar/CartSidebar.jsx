"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CartSidebar.css";
import {
  toggleCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  selectCartTotal,
  selectCartLength,
} from "../../redux/cartSlice";

const CartSidebar = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const cartItems = useSelector((state) => state.cart.cart);
  const cartTotal = useSelector(selectCartTotal);
  const cartLength = useSelector(selectCartLength);

  // ✅ Get all product categories at once
  const stateProducts = useSelector((state) => state.products);

  const handleClose = () => dispatch(toggleCart());

  // Get cart items with product details from global products
  const cartWithDetails = cartItems.map((cartItem) => {
    // Get all products from state
    const allProducts = Object.values(stateProducts).flat();

    // Find the product in the correct category
    const product = allProducts.find((p) => p.productID === cartItem.productId);

    if (!product) return null;

    const colorImage = product.imageColorMap.find(
      (img) => img.color === cartItem.color
    );

    return {
      ...product,
      quantity: cartItem.quantity,
      color: cartItem.color,
      selectedImage: colorImage ? colorImage.image : product.mainproductImage,
    };
  }).filter(Boolean);




  return (
    <>
      <div className="fixed-cart-icon" onClick={() => dispatch(toggleCart())}>
        <span className="badge">{cartLength}</span>
        <i className="fa fa-shopping-cart"></i>
      </div>

      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button onClick={handleClose} className="close-btn">
            &times;
          </button>
        </div>

        <div className="free-shipping-progress">
          <p>
            <span>FREE</span> Delivery Around Nairobi.
          </p>
        </div>

        <>
          <div className="cart-items-wrapper">
            {cartWithDetails.map((item, index) => (
              <div key={index} className="sidebar-cart-item">
                <img src={item?.selectedImage} alt={item?.Title} />
                <div className="sidebar-cart-item-details">
                  <h3>{item?.Title}</h3>
                  <p className="item-color">Color: <span>{item?.color}</span></p>
                  <p className="cart-item-paragraph">
                    KSh {item?.nowPrice?.toLocaleString() || '0'}
                  </p>
                  <p className="item-details-paragraph">{item?.details}</p>
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        dispatch(decrementQuantity({
                          productId: item.productID,
                          color: item.color,
                        }))
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(incrementQuantity({
                          productId: item.productID,
                          color: item.color,
                        }))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-item"
                  onClick={() => dispatch(removeFromCart({
                    productId: item.productID,
                    color: item.color,
                  }))}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary ml-2">
            <div className="summary-row">
              <span>Total Items</span>
              <span className="font-bold">{cartLength}</span>
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span className="font-bold">KSh {cartTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex justify-between py-4 px-2 gap-4">
            <a
              href="/cart"
              className="w-full text-center py-3 font-bold bg-secondary text-white"
            >
              View Full Cart
            </a>
            <a
              href="/checkout"
              className="w-full text-center py-3 font-bold border border-primary text-primary"
            >
              Checkout
            </a>
          </div>
        </>
      </div>
    </>
  );
};

export default CartSidebar;