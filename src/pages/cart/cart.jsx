"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity, selectCartTotal, selectCartLength } from '../../redux/cartSlice';
import './cart.css'
import { Link } from 'react-router-dom';
// import Link from 'next/link';


const CartPage = () => {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);
  const cartTotal = useSelector(selectCartTotal);
  const cartLength = useSelector(selectCartLength);

  
    // ✅ Get all product categories at once
    const allProducts = useSelector((state) => state.products);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="cart-page-wrapper">Loading...</div>;
  }

  // Get cart items with product details from global products
  const cartWithDetails = cartItems.map((cartItem) => {
    const categoryProducts = allProducts[cartItem.category] || [];
    const product = categoryProducts.find((p) => p.productID === cartItem.productId);

    if (!product) return null; // Avoid errors if product is missing

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
    <section className="cart-page-wrapper">
      <div className="cart-page">
        <div className="cart-page-header mb-10">
          <Link href="/products">
            <i className="fa fa-arrow-left"></i> Continue Shopping
          </Link>

          <p>
            <Link href="/">Home</Link>&nbsp;/&nbsp;
            <Link href="/products">Products</Link>&nbsp;/&nbsp;
            <Link href="#">Cart</Link>
          </p>
        </div>

        <div className="cart-container">
          <div className="cart-page-items">
            <div className="cart-page-items-header">
              <h4>Product</h4>
              <h4>Unit Price</h4>
              <h4>Quantity</h4>
              <h4>Total Price</h4>
            </div>

            <div className="cart-page-items-header-mobile">
              <h1>Product Details</h1>
            </div>
            {cartWithDetails.map((item, index) => (
              <div key={index} className="cart-page-item py-4">
                <img src={item.selectedImage} alt={item.Title} className="item-image" />
                <div className="cart-page-item-title">
                  <h3 className="item-title text-gray-800">{item.Title}</h3>
                  <div className="item-attributes">
                    <p>Color: <span>{item.color || item.defaultColor}</span></p>
                    <p>Condition: <span>{item.condition || '42'}</span></p>
                  </div>
                </div>
                <div className="item-price">
                  <p className="font-bold text-xl text-gray-700">KSh {(item.nowPrice || 0).toLocaleString()}</p>
                  <p className="unit-price-mobile">Unit Price <span> KSh {(item.nowPrice || 0).toLocaleString()}</span></p>
                </div>
                <div className="item-details">
                  <div className="quantity-control">
                    <button
                      onClick={() => dispatch(decrementQuantity({
                        productId: item.productID,
                        color: item.color,
                      }))}
                      className="quantity-button"
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                    <span className="quantity font-bold">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementQuantity({
                        productId: item.productID,
                        color: item.color,
                      }))}
                      className="quantity-button"
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="item-price">
                  <p className="price">KSh {(item.nowPrice * item.quantity || 0).toLocaleString()}</p>
                  <p className="total-price-mobile">Total Price: <span> KSh {(item.nowPrice * item.quantity || 0).toLocaleString()}</span></p>
                  <button onClick={() => dispatch(removeFromCart({
                    productId: item.productID,
                    color: item.color,
                  }))} className="text-red-600 text-xl cursor-pointer ">
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}

          </div>

          <div className="order-summary">
            <div className="summary-content">
              <h2 className="summary-title">Cart Total</h2>
              <div className="summary-row">
                <span>Cart Subtotal</span>
                <span className='font-bold'>KSh {cartTotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className="free-shipping">FREE AROUND NAIROBI</span>
              </div>
              <div className="summary-row">
                <span>Discount</span>
                <span>KSh 0.00</span>
              </div>
              <div className="summary-row total">
                <span>Cart Total</span>
                <span>KSh {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="promo-code">
              <input
                type="text"
                placeholder="Coupon Code"
                className="promo-input"
              />
              <button className="promo-button">Check</button>
            </div>

            <a href={'/checkout'} className="bg-black block text-white w-full py-4 mt-5 text-center text-xl">Proceed to Checkout</a>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa fa-truck"></i>
            </div>
            <div className="feature-text">
              <strong>Free Delivery</strong><br />
              Free Delivery Around Nairobi
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa fa-phone"></i>
            </div>
            <div className="feature-text">
              <strong>Call Us Anytime</strong><br />
              +254-791-880-412
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-headset"></i>
            </div>
            <div className="feature-text">
              <strong>Chat With Us</strong><br />
              24-hour live chat support
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fab fa-twitch"></i>
            </div>
            <div className="feature-text">
              <strong>Gaming Community</strong><br />
              Join the Ultimate Community
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;

