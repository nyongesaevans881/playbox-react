import RelatedProductsCarousel from '../../../components/carousels/relatedProductsCarousel/RelatedProductsCarousel';
import ProductDetailsCarousel from '../../../components/productDetailsCarousel/ProductDetailsCarousel';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';
import { useParams } from 'react-router-dom';
import React, { use, useState } from 'react';
const favicon = '/favicon.png'
import './name.css';

const Name = ({ params }) => {
  const { name, category } = useParams();
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const [snackbar, setSnackbar] = useState({ visible: false, type: '', message: '' });

  const products = useSelector((state) => state.products[category] || []);

  const product = products.find((p) => p.name === name);

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

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  // Extract unique colors from imageColorMap
  const uniqueColors = Array.from(
    new Set(product.imageColorMap.map((entry) => entry.color))
  );

  return (
    <>
      <div className="product-landing-page container">
        <div className="product-details-page-header">
          <div className="product-details-page-head-left">
            <a href="/"><img src={favicon} alt="Home" /> &nbsp;&nbsp;Home</a>
            <i className="fa fa-chevron-right"></i>
            <a href="/products">Products</a>
            <i className="fa fa-chevron-right"></i>
            <a href={product.category}>{product.category}</a>
            <i className="fa fa-chevron-right mobile-responsive-chevron"></i>
            <a href="" className='mobile-responsive-name-title'> {product.Title}</a>
          </div>
          <div className="product-details-page-head-right">
            <img src={product.playboxRatingIcon} alt='spidey-rating' />
            Playbox Rated:<span className='font-bold'>{product.playboxRating}</span>
          </div>
        </div>

        <div className="details-main-content-wrapper">
          <div className="image-carousel">
            <ProductDetailsCarousel images={product.imageColorMap.map((entry) => entry.image)} />
          </div>

          <div className="product-landing-header">
            <img src={product.detailsPoster} alt="poster" className='max-h-40 object-cover'/>
            <div className="product-info mt-4">
              <h1 className='text-2xl font-bold'>{product.Title}</h1>
              <h3 className='capitalize font-bold'>{product.SubTitle}</h3>
              <div className='after-details-header mb-2 max-md:flex-col max-md:gap-4 max-md:mb-4'>
                <div className="flex gap-4 mb-2">
                  <span className='bg-blue-800/50 border-2 border-blue-800 px-4'>
                    {product.stock ? <h6 className='details-in-stock'>In stock</h6> : <h6 className='details-out-of-stock'>Out of stock</h6>}
                  </span>
                  <span className='bg-blue-800/50 border-2 border-blue-800 px-4'>
                    <i className="fa fa-truck"></i>&nbsp;&nbsp;
                    {product.freeShipping && "Free Delivery (Nairobi)"}
                  </span>
                </div>
                <div className="h3-details-right">
                  <i className="fa fa-share-alt"></i>
                  <i className="far fa-heart"></i>
                </div>
              </div>

              <p>{product.description}</p>

              <h6 className='my-4'>
                <span>Colors:</span>
                {uniqueColors.map((color, index) => (
                  <button
                    key={index}
                    className={`color-button ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  >
                    {/* {color} */}
                  </button>
                ))}
              </h6>

              <div className="details-footer-display">
                <div className="product-pricing">
                  <span className="now-price font-extrabold">Ksh. {product.nowPrice.toLocaleString()}</span>
                  <span className="prev-price">Ksh. {product.prevPrice.toLocaleString()}</span>
                </div>
                <button className="add-to-cart-btn" onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product.productID);
                }}> <i className="fas fa-shopping-basket"></i>&nbsp; Add to Cart</button>
                <button className="whatsapp-order" onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product.productID);
                }}> <i className="fab fa-whatsapp"></i>&nbsp;Whatsapp Order</button>
              </div>
            </div>
          </div>
        </div>



        <div className="product-specs mb-10">
          <h1 className='text-4xl uppercase py-4 font-bold'>Product Details</h1>
          <div className="product-specs-layout mb-10 max-md:gap-8">
            <div className="product-specs-left">
              <p>{product.detailsDescription}</p>
              <ul className='ml-15 max-md:ml-10'>
                {product.detailSpecs.map((spec, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: spec }}></li>
                ))}
              </ul>
            </div>
            <div className="product-specs-right">
              <h4 className='text-2xl uppercase font-bold'>Quick Overview Specs</h4>
              <div className="product-details-page-top-specs">
                <ul>
                  {product.topSpecs.map((spec, index) => (
                    <li className='my-5' key={index} dangerouslySetInnerHTML={{ __html: spec }}></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="youtube-videos">
            <div className="youtube-video-single">
              <h5 className='font-bold mb-5'> <i className="fab fa-youtube"></i> Youtube Review</h5>
              <iframe src={product.youtubeReview} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <div className="youtube-video-single">
              <h5 className='font-bold mb-5'> <i className="fab fa-youtube"></i> Unboxing Experience</h5>
              <iframe src={product.unboxingVideo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          </div>
        </div>

      </div>
      <section className="product-details-related-products-carousel">
        <div className="product-details-related-products-carousel-wrapper container">
          <RelatedProductsCarousel category={product.category} />
        </div>
      </section>
    </>
  );
};

export default Name;
