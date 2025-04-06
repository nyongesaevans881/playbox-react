import Headphones from "../carousels/headphones/Headphones";

const HeadphonesWidget = () => {
    return (
        <div className="grid grid-cols-3 items-center relative gap-4 max-md:grid-cols-1 max-md:mx-4">
            <div className="relative">
                <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743937746/headphones-static_oibyyp.png" alt="" className="h-120 object-cover" loading="lazy" />
                <div className="absolute top-5 right-5 text-white">
                    <div className="uppercase p-0 m-0 flex items-center gap-2 font-extrabold text-4xl">
                        <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1741506069/headphones_fhmq4k.png" alt="" className="h-8" />
                        Pro Gaming
                    </div>
                    <p className="text-right p-0 m-0 text-2xl">Headphones</p>
                </div>
                <div className="absolute bottom-12 right-5">
                    <a href="/products/headphones" className="bg-primary py-2 px-6 font-semibold cursor-pointer text-white text-xl">
                        Explore More
                    </a>
                </div>
            </div>
            <div className="col-span-2 h-full max-md:mt-20">
                <Headphones />
            </div>
        </div>
    );
};

export default HeadphonesWidget;
