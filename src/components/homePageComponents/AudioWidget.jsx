const AudioWidget = () => {
    return (
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 mx-4">
            <div className="bg-pink-400/30 flex items-center justify-between p-4 border-2 border-pink-600 relative overflow-hidden h-40 cursor-pointer max-md:w-full">
                <div className="flex flex-col items-start max-w-[50%] z-6">
                    <span className="text-pink-600 font-bold">Upto 15% Off</span>
                    <span className="text-2xl font-light text-gray-800">BLUETOOTH SPEAKERS</span>
                    <a href="/products/audio/speakers" className="bg-pink-600 py-1 px-4 text-white font-bold mt-2 cursor-pointer">Shop Now</a>
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744461597/jbl_vhxyut.png" alt="" className="h-50 object-contain z-5 absolute right-0 -bottom-5 max-md:h-30 max-md:-bottom-2" loading="lazy"/>
                </div>
                <div className="h-50 w-50 bg-white/50 rounded-full absolute z-1 right-20 -bottom-35"></div>
                <div className="h-50 w-50 bg-white/50 rounded-full absolute z-1 right-26 -bottom-30"></div>
            </div>
            <div className="bg-blue-400/30 flex items-center justify-between p-4 border-2 border-blue-600 relative overflow-hidden h-40 cursor-pointer">
                <div className="flex flex-col items-start max-w-[50%] z-6">
                    <span className="text-blue-600 font-bold">Upto 30% Off</span>
                    <span className="text-2xl font-light text-gray-800">EARBUDS & NECKBANDS</span>
                    <button className="bg-blue-600 py-1 px-4 text-white font-bold mt-2 cursor-pointer">Shop Now</button>
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744461597/earbuds_hzau2d.png" alt="" className="h-40 object-contain z-5 absolute right-5 -bottom-0 max-md:h-30 max-md:-bottom-0" loading="lazy"/>
                </div>
                <div className="h-50 w-50 bg-white/50 rounded-full absolute z-1 right-20 -bottom-35"></div>
                <div className="h-50 w-50 bg-white/50 rounded-full absolute z-1 right-26 -bottom-30"></div>
            </div>
            <div className="bg-green-400/30 flex items-center justify-between p-4 border-2 border-green-600 relative overflow-hidden h-40 cursor-pointer">
                <div className="flex flex-col items-start max-w-[50%] z-6">
                    <span className="text-green-600 font-bold">Upto 25% Off</span>
                    <span className="text-2xl font-light text-gray-800">SOUND BARS & SUBWOOFERS</span>
                    <button className="bg-green-600 py-1 px-4 text-white font-bold mt-2 cursor-pointer">Shop Now</button>
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744461597/soundbar_o6cu3i.png" alt="" className="h-40 object-contain z-5 absolute right-5 bottom-0 max-md:h-30 max-md:-bottom-0" loading="lazy"/>
                </div>
                <div className="h-50 w-50 bg-white/50 rounded-full absolute z-1 right-20 -bottom-35"></div>
                <div className="h-50 w-50 bg-white/50 rounded-full absolute z-1 right-26 -bottom-30"></div>
            </div>
        </div>
    );
};

export default AudioWidget;
