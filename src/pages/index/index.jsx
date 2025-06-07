//--------------- Stylesheets
import './index.css'

//--------------- Images Import
const spideySeparator = '/spidey/spider-separator.png'
const spideyScroll = '/spidey/scroll.png'

//--------------Constants Import
import PcPeripherals from '../../components/carousels/pcPeripherals/PcPeripherals'
import PcSetUpComponent from '../../components/pcSetupComponent/PcSetUpComponent'
import SpideyDialogBox from '../../components/spideyDialogBox/SpideyDialogBox'
import GamesCarousel from '../../components/carousels/gamesCarousel/GamesCarousel'
import Button49 from '../../components/button49/Button49'
import AccessoriesWidget from '../../components/homePageComponents/AccessoriesWidget'
import Ps5AccesoriesWidget from '../../components/homePageComponents/Ps5AccesoriesWidget'
import AudioWidget from '../../components/homePageComponents/AudioWidget'
import GamingBlog from '../../components/gamingBlog/GamingBlog'
import HeadphonesWidget from '../../components/homePageComponents/HeadphonesWidget'
import { MoveRight, Rocket, ShoppingCart } from 'lucide-react'
import BestSellers from '../../components/carousels/bestSellers/BestSellers'
import LatestArrivals from '../../components/carousels/latestArrivals/LatestArrivals'
import XboxAccesoriesWidget from '../../components/homePageComponents/XboxAccesoriesWidget'
import ProductPopup from '../../components/productsPopup/ProductsPopup'
import { useState } from 'react'
import StoreCategoriesSection from '../../components/homePageComponents/StoreCategoriesSection'
import BrandLogoCarousel from '../../components/homePageComponents/BrandLogoCarousel'

const Index = () => {
  const [productCategory, setproductCategory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [productID, setProductID] = useState(null);


  const closePopup = () => {
    setShowPopup(false);
    setProductID(null);
  };

  return (
    <section className='home-main-section max-md:overflow-x-hidden'>
      {/*=========== START: HERO SECTION =============*/}
      <div className="hero-section">
        <h1 className='text-5xl uppercase font-bold text-white'>"Your Ultimate Gaming Destination"</h1>
        <div className="call-to-action-hero max-md:flex-col max-md:mt-5">
          <a href="/products" className='flex items-center gap-2'><ShoppingCart className='h-6' /> Shop Products</a>
          <a href="/products/games" className='flex items-center gap-2'><Rocket className='h-6' /> Video Games</a>
        </div>
      </div>
      {/*=========== END: HERO SECTION =============*/}



      {/*=========== START: BEST SELLERS ============*/}
      <div className="container py-10">
        <LatestArrivals />
      </div>
      {/*============ END: BEST SELLERS ===========*/}

      {/*=========== START: POPULAR PRODUCTS ============*/}
      <div className="container py-10 pb-30">
        <BestSellers />
      </div>
      {/*============ END: POPULAR PRODUCTS ===========*/}



      {/*=========== START: GAMING LAPTOPS& PC SET-UP ============*/}
      <div className="white-laptops-section white-absolute-container">
        {/* //--------Gaming Laptops */}
        <div className="playbox-skins-section container">
          <div className="paybox-skins-heading">
            <h2 className='text-4xl font-bold'>Pc <span className="gradient-text">Peripherals</span> & <span className="gradient-text">Accessories</span></h2>
            <p className='font-medium text-justify max-md:text-center'>PC peripherals and accessories. RGB-enhanced mechanical keyboards & precision gaming mice, we've got <span className='text-secondary font-bold'>everything you need</span> to dominate the competition.</p>
            <div className='mb-4'>
              <a href="/products/keyboards">
                <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1741498214/keyboard_tvlrnd.png" alt="" className='cursor-pointer' title='Click to explore gaming keyboards' />
              </a>
              <div className='flex justify-between max-md:mx-0 max-md:w-full'>
                <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1742219751/pc-case-1_rdvuec.png" alt="" className='h-20 border border-gray-300 cursor-pointer hover:border-primary' title='Click to explore gaming pc cases' />
                <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744298582/mouse-black_hik0da.png" alt="" className='h-20 border border-gray-300 cursor-pointer hover:border-primary' title='Click to explore gaming mice' />
                <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1745177821/lenovo-r27fc-30-3_nhl9jc.png" alt="" className='h-20 border border-gray-300 cursor-pointer hover:border-primary p-1' />
                <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1742219751/pc-case-1_rdvuec.png" alt="" className='h-20 border border-gray-300 cursor-pointer hover:border-primary' />
              </div>
            </div>
            <div className="paybox-laptops-buttons-wrapper">
              <Button49 text={"Explore All Items"} to={"/products/hardware"} />
            </div>
          </div>
          <div className="playbox-gaming-laptops-sliders h-full">
            <PcPeripherals />
          </div>
        </div>

        {/* //------------ Gaming Pc Set-Up */}
        <div className="pc-setup-section container">
          <PcSetUpComponent />
          <div className="pc-spidey-commment">
            <div className="pc-spidey-commment-box-wrapper">
              <SpideyDialogBox text='Build a <span>FULL SETUP!</span> We provide you with all the essential components and guides.' imageSrc='https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743931764/pc_tj25og.png' />
            </div>
            <img className='pc-spidey' src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743931764/pc_tj25og.png" alt="" loading='lazy' />
            <div className="paybox-laptops-buttons-wrapper max-md:mx-4 max-md:pt-12">
              <Button49 text={"Shop PC All Items"} to={"/products/pc"} />
            </div>
          </div>
        </div>

      </div>
      {/*=========== END: GAMING LAPTOPS& PC SET-UP ============*/}



      {/*=========== START: GAMES CAROUSEL SECTION ============*/}
      <section className="home-page-games container">
        <div className="home-page-games-content max-md:block max-md:mx-auto">
          <GamesCarousel setproductCategory={setproductCategory} setProductID={setProductID} setShowPopup={setShowPopup} />
        </div>
        <div className="container absolute bottom-18 z-999 text-white px-5 flex gap-6 max-md:flex-col">
          <div className="text-white w-80 flex items-center justify-between border-b-2 border-secondary">
            <img
              className='h-40'
              src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1749309110/racing_qijlu2.png"
              alt="sports"
            />
            <div className="flex flex-col items-start justify-center px-4 relative w-full">
              <h4 className='font-bold absolute text-2xl w-100 -top-1 -left-5'>Racing Games</h4>
              <div className='w-full pt-8'>
                <a className='flex justify-between px-1 text-secondary font-bold border border-secondary w-full my-2 cursor-pointer hover:bg-secondary transition-4 hover:text-white' href="">
                  Ps 5
                  <MoveRight />
                </a>
                <a className='flex justify-between px-1 text-secondary font-bold border border-secondary w-full my-2 cursor-pointer hover:bg-secondary transition-4 hover:text-white' href="">
                  Ps 4
                  <MoveRight />
                </a>
                <a className='flex justify-between px-1 text-secondary font-bold border border-secondary w-full my-2 cursor-pointer hover:bg-secondary transition-4 hover:text-white' href="">
                  Xbox
                  <MoveRight />
                </a>
              </div>
            </div>
          </div>
          <div className="text-white w-80 flex items-center justify-between border-b-2 border-secondary">
            <img
              className='h-40'
              src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1749305601/sports_1_j2ztt3.png"
              alt="sports"
            />
            <div className="flex flex-col items-start justify-center px-4 relative w-full">
              <h4 className='font-bold absolute text-2xl w-100 -top-1 -left-5'>Sports Games</h4>
              <div className='w-full pt-8'>
                <a className='flex justify-between px-1 text-secondary font-bold border border-secondary w-full my-2 cursor-pointer hover:bg-secondary transition-4 hover:text-white' href="">
                  Ps 5
                  <MoveRight />
                </a>
                <a className='flex justify-between px-1 text-secondary font-bold border border-secondary w-full my-2 cursor-pointer hover:bg-secondary transition-4 hover:text-white' href="">
                  Ps 4
                  <MoveRight />
                </a>
                <a className='flex justify-between px-1 text-secondary font-bold border border-secondary w-full my-2 cursor-pointer hover:bg-secondary transition-4 hover:text-white' href="">
                  Xbox
                  <MoveRight />
                </a>
              </div>
            </div>
          </div>
          <div className="text-white w-80 flex items-center justify-between border-b-2 border-secondary">
            <img
              className='h-40'
              src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1749310258/shooter_xtyihk.png"
              alt="sports"
            />
            <div className="flex flex-col items-start justify-center px-4 relative w-full">
              <h4 className='font-bold absolute text-2xl w-100 -top-1 -left-5'>Shooter Games</h4>
              <div className='w-full pt-8'>
                <a className='flex justify-between px-1 text-secondary font-bold border border-secondary w-full my-2 cursor-pointer hover:bg-secondary transition-4 hover:text-white' href="">
                  Ps 5
                  <MoveRight />
                </a>
                <a className='flex justify-between px-1 text-secondary font-bold border border-secondary w-full my-2 cursor-pointer hover:bg-secondary transition-4 hover:text-white' href="">
                  Ps 4
                  <MoveRight />
                </a>
                <a className='flex justify-between px-1 text-secondary font-bold border border-secondary w-full my-2 cursor-pointer hover:bg-secondary transition-4 hover:text-white' href="">
                  Xbox
                  <MoveRight />
                </a>
              </div>
            </div>
          </div>
          <div className="text-white w-80 flex items-center justify-between border-b-2 border-secondary">
            <img
              className='h-40'
              src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1749311463/adventure_s5599h.png"
              alt="sports"
            />
            <div className="flex flex-col items-start justify-center px-4 relative w-full">
              <h4 className='font-bold absolute text-2xl w-100 -top-1 -left-5'>Adventure</h4>
              <div className='w-full pt-8'>
                <a className='flex justify-between px-1 text-secondary font-bold border border-secondary w-full my-2 cursor-pointer hover:bg-secondary transition-4 hover:text-white' href="">
                  Ps 5
                  <MoveRight />
                </a>
                <a className='flex justify-between px-1 text-secondary font-bold border border-secondary w-full my-2 cursor-pointer hover:bg-secondary transition-4 hover:text-white' href="">
                  Ps 4
                  <MoveRight />
                </a>
                <a className='flex justify-between px-1 text-secondary font-bold border border-secondary w-full my-2 cursor-pointer hover:bg-secondary transition-4 hover:text-white' href="">
                  Xbox
                  <MoveRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*=========== END: GAMES CAROUSEL SECTION ============*/}



      {/*=========== START: PS-5: ACCESSORIES & SKINS SECTION ============*/}
      <div className="white-accessories-secion">
        <div className="spidey-separator z-2">
          <img className='separator-image' src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743931764/spider-separator_dnxt9h.png" alt="" loading='lazy' />
        </div>

        {/* //----------- Ps-5 Accessories */}
        <div className='container max-md:pt-30'>
          <div>
            <Ps5AccesoriesWidget setproductCategory={setproductCategory} setProductID={setProductID} setShowPopup={setShowPopup} />
          </div>
          <div className='py-15'>
            <AccessoriesWidget />
          </div>
          <div>
            <XboxAccesoriesWidget setproductCategory={setproductCategory} setProductID={setProductID} setShowPopup={setShowPopup} />
          </div>
        </div>
      </div>
      {/*=========== END: PS-5: ACCESSORIES & SKINS SECTION ============*/}




      {/*=========== START: GAMING BLOG SECTION ============*/}
      <section>
        <div className="container">
          <GamingBlog />
        </div>
      </section>
      {/*=========== END: GAMING BLOG SECTION ============*/}



      {/*=========== START: HEADPHONES SECTION ============*/}
      <section className="bg-white">
        <div className='container py-20 max-md:pt-0 pb-20'>
          <HeadphonesWidget />
        </div>
        <div className="container py-0 pb-20">
          <AudioWidget />
        </div>
      </section>
      {/*=========== END: HEADPHONES SECTION ============*/}

      <div className="StoreCategoriesSection">
        <StoreCategoriesSection />
      </div>

      <div>
        <BrandLogoCarousel />
      </div>

      <div>
        {showPopup && <ProductPopup productId={productID} productCategory={productCategory} onClose={closePopup} />}
      </div>
    </section>
  )
}

export default Index