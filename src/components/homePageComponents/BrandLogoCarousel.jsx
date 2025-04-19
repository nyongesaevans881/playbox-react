import { useEffect, useRef } from 'react';

export default function BrandLogoCarousel() {
  const carouselRef = useRef(null);
  const innerCarouselRef = useRef(null);
  
  // Sample logos - you'll replace these with your actual brand images
  const brandLogos = [
    { id: 1, name: "Brand 1", imageUrl: "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744989185/molten_znisvt.png" },
    { id: 2, name: "Brand 2", imageUrl: "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744989184/x-box_d0pj1n.png" },
    { id: 3, name: "Brand 3", imageUrl: "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744989184/adcom_dawmnb.png" },
    { id: 4, name: "Brand 4", imageUrl: "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744989184/switch_yw1eym.png" },
    { id: 5, name: "Brand 5", imageUrl: "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744989185/spalding_v40bnr.png" },
    { id: 6, name: "Brand 6", imageUrl: "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744989184/jbl_kqcgnr.png" },
    { id: 7, name: "Brand 7", imageUrl: "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744989418/ps5_ccaikx.png" },
    { id: 8, name: "Brand 8", imageUrl: "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744989418/ps4_wb3gnr.png" },
  ];
  
  // Animation using requestAnimationFrame for smooth performance
  useEffect(() => {
    let animationFrameId;
    let startTime;
    const speed = 0.05; // pixels per millisecond - adjust for slower/faster motion
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      
      const elapsed = timestamp - startTime;
      const translateX = (elapsed * speed) % innerCarouselRef.current.offsetWidth / 2;
      
      innerCarouselRef.current.style.transform = `translateX(-${translateX}px)`;
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <section className="w-full py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div 
          ref={carouselRef}
          className="w-full overflow-hidden"
        >
          <div 
            ref={innerCarouselRef} 
            className="flex items-center"
            style={{ width: '200%' }} // Double width for seamless loop
          >
            {/* First set of logos */}
            {brandLogos.map(logo => (
              <div key={logo.id} className="flex-none px-8 py-4">
                <div className="h-16 flex items-center justify-center grayscale cursor-pointer hover:grayscale-0 transition-all duration-300">
                  <img 
                    src={logo.imageUrl} 
                    alt={`${logo.name} logo`} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
            
            {/* Duplicate set for infinite loop effect */}
            {brandLogos.map(logo => (
              <div key={`dup-${logo.id}`} className="flex-none px-8 py-4">
                <div className="h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                  <img 
                    src={logo.imageUrl} 
                    alt={`${logo.name} logo`} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}