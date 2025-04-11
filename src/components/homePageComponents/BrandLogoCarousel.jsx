import { useEffect, useRef } from 'react';

export default function BrandLogoCarousel() {
  const carouselRef = useRef(null);
  const innerCarouselRef = useRef(null);
  
  // Sample logos - you'll replace these with your actual brand images
  const brandLogos = [
    { id: 1, name: "Brand 1", imageUrl: "/api/placeholder/160/80" },
    { id: 2, name: "Brand 2", imageUrl: "/api/placeholder/160/80" },
    { id: 3, name: "Brand 3", imageUrl: "/api/placeholder/160/80" },
    { id: 4, name: "Brand 4", imageUrl: "/api/placeholder/160/80" },
    { id: 5, name: "Brand 5", imageUrl: "/api/placeholder/160/80" },
    { id: 6, name: "Brand 6", imageUrl: "/api/placeholder/160/80" },
    { id: 7, name: "Brand 7", imageUrl: "/api/placeholder/160/80" },
    { id: 8, name: "Brand 8", imageUrl: "/api/placeholder/160/80" },
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
                <div className="h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
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