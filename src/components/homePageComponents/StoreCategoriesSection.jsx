import { useState } from 'react';
import { Gamepad, Gift } from 'lucide-react';
import { PiOfficeChair } from "react-icons/pi";
import { GiSkateboard } from "react-icons/gi";
import { TbFidgetSpinner } from "react-icons/tb";

export default function StoreCategoriesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const categories = [
    {
      id: 1,
      title: "ACTION & RIDE",
      description: "Skateboards, longboards, scooters, BMX, bikes, Drones",
      icon: <GiSkateboard size={32} />,
      imageUrl: "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744398555/skate-removebg-preview_ayevyf.png",
      color: "#ef3563" // Orange
    },
    {
      id: 2,
      title: "TOYS & COLLECTABLES",
      description: "Figurines, limited editions, merchandise, and rare items",
      icon: <TbFidgetSpinner size={32} />,
      imageUrl: "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744399688/fidget-removebg-preview_mgbwcs.png",
      color: "#ef3563" // Your primary color
    },
    {
      id: 3,
      title: "GAMING DECOR",
      description: "Posters, wall art, LED lights, and themed decorations",
      icon: <Gamepad size={32} />,
      imageUrl: "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744399687/decor-removebg-preview_r8bcjt.png",
      color: "#ef3563" // Your secondary color
    },
    {
      id: 4,
      title: "FURNITURE",
      description: "Gaming chairs, desks, storage units, and accessories",
      icon: <PiOfficeChair size={32}/>,
      imageUrl: "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744403324/chair-removebg-preview_lyu8hf.png",
      color: "#ef3563" // Purple
    }
  ];

  return (
    <section className="w-full bg-white pb-15 px-4 md:px-8">
      <div className="container">

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card */}
              <div className="flex flex-col h-full overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-lg border-2 border-gray-300 p-2">
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden mb-4">
                  <img 
                    src={category.imageUrl} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Content Section */}
                <div className="text-gray-900 p-6 flex-1 flex flex-col bg-gray-200">
                  {/* Icon in Circle */}
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300 text-white"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  
                  {/* Button */}
                  <div className="mt-auto">
                    <button 
                      className="px-6 py-2 font-medium text-white transition-all duration-300 w-full text-center"
                      style={{ 
                        backgroundColor: hoveredIndex === index ? "#fff" : category.color,
                        color: hoveredIndex === index ? "#000" : "#fff"
                      }}
                    >
                      Explore More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}