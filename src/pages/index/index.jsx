//--------------- Stylesheets
import './index.css'

//--------------- Images Import
const spideySeparator = '/spidey/spider-separator.png'
const spideyScroll = '/spidey/scroll.png'

//--------------Constants Import
import PcPeripherals from '../../components/carousels/PcPeripherals/PcPeripherals'
import PcSetUpComponent from '../../components/pcSetupComponent/PcSetUpComponent'
import SpideyDialogBox from '../../components/spideyDialogBox/SpideyDialogBox'
import GamesCarousel from '../../components/carousels/gamesCarousel/GamesCarousel'
import Button49 from '../../components/button49/Button49'
import AccessoriesWidget from '../../components/homePageComponents/AccessoriesWidget'
import Ps5AccesoriesWidget from '../../components/homePageComponents/Ps5AccesoriesWidget'
import AudioWidget from '../../components/homePageComponents/AudioWidget'
import GamingBlog from '../../components/gamingBlog/GamingBlog'
import HeadphonesWidget from '../../components/homePageComponents/HeadphonesWidget'
import { LaptopMinimalCheck, PcCase, Rocket, ShoppingCart } from 'lucide-react'
import BestSellers from '../../components/carousels/bestSellers/BestSellers'
import LatestArrivals from '../../components/carousels/latestArrivals/LatestArrivals'

const Index = () => {
  return (
    <section className='home-main-section'>
      {/*=========== START: HERO SECTION =============*/}
      <div className="hero-section">
        <h1 className='text-5xl uppercase font-bold text-white'>"Your Ultimate Gaming Destination"</h1>
        <div className="call-to-action-hero max-md:flex-col max-md:mt-5">
          <a href="/products" className='flex items-center gap-2'><ShoppingCart className='h-6'/> Shop Products</a>
          <a href="/products/games" className='flex items-center gap-2'><Rocket className='h-6'/> Video Games</a>
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
            <p>Get you PC essentials from our curated collection of peripherals and accessories.</p>
            <div className='flex flex-col gap-2 my-2'>
              <a href="" className='text-primary font-bold uppercase flex items-center py-2 px-4 text-center justify-center gap-2 border-2'>
              <LaptopMinimalCheck />
                Gaming Laptops
              </a>
              <a href="" className='text-primary font-bold uppercase flex items-center py-2 px-4 text-center justify-center gap-2 border-2'>
              <PcCase />
              Gaming Computers
              </a>
            </div>
            <div className="paybox-laptops-tags-wrapper">
              <a href="#">Keyboards</a>
              <a href="#">Mice</a>
              <a href="#">Speakers</a>
              <a href="#">Microphones</a>
              <a href="#">Mouse Pads</a>
              <a href="#">Headphones</a>
              <a href="#">Lights</a>
            </div>
            <div className="paybox-laptops-buttons-wrapper">
              <Button49 text={"Explore All Items"} picIcon={"/pc/pc-peripherals.png"} />
            </div>
          </div>
          <div className="playbox-gaming-laptops-sliders">
            <PcPeripherals />
          </div>
        </div>

        {/* //------------ Gaming Pc Set-Up */}
        <div className="pc-setup-section container">
          <PcSetUpComponent />
          <div className="pc-spidey-commment">
            <div className="pc-spidey-commment-box-wrapper">
              <SpideyDialogBox text='<span>SWEET!</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum.' imageSrc='https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743931764/pc_tj25og.png' />
            </div>
            <img className='pc-spidey' src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743931764/pc_tj25og.png" alt="" loading='lazy' />
          </div>
        </div>

      </div>
      {/*=========== END: GAMING LAPTOPS& PC SET-UP ============*/}



      {/*=========== START: GAMES CAROUSEL SECTION ============*/}
      <section className="home-page-games container">
        <div className="home-page-games-content max-md:block max-md:mx-auto">
          <GamesCarousel />
        </div>
      </section>
      {/*=========== END: GAMES CAROUSEL SECTION ============*/}



      {/*=========== START: PS-5: ACCESSORIES & SKINS SECTION ============*/}
      <div className="white-accessories-secion">
        <div className="spidey-separator">
          <div className="spidey-separator-dialog-box-wrapper">
            <SpideyDialogBox
              imageSrc="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743931764/pc_tj25og.png"
              text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto quae accusantium."
            />
          </div>
          <img className='separator-image' src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743931764/spider-separator_dnxt9h.png" alt="" loading='lazy' />
        </div>

        {/* //----------- Ps-5 Accessories */}
        <div className='container max-md:pt-30'>
          <div>
            <Ps5AccesoriesWidget />
          </div>
          <div className='py-15'>
            <AccessoriesWidget />
          </div>
        </div>
      </div>
      {/*=========== END: PS-5: ACCESSORIES & SKINS SECTION ============*/}




      {/*=========== START: GAMING BLOG SECTION ============*/}
      <section className="gaming-blog-section">
        <div className="container">
          <GamingBlog />
        </div>
      </section>
      {/*=========== END: GAMING BLOG SECTION ============*/}



      {/*=========== START: HEADPHONES SECTION ============*/}
      <section className="bg-white">
        <div className='container py-20'>
          <HeadphonesWidget />
        </div>
        <div className="container py-0 pb-20">
          <AudioWidget />
        </div>
      </section>
      {/*=========== END: HEADPHONES SECTION ============*/}


    </section>
  )
}

export default Index