import { Rocket } from "lucide-react";
import Ps5Accessories from "../carousels/ps5Accessories/Ps5Accessories";

const Ps5AccesoriesWidget = ({ setproductCategory, setProductID, setShowPopup }) => {
    return (
        <div className="grid grid-cols-3 items-center relative max-md:grid max-md:grid-cols-1 max-md:mx-4 z-0">
            <div className='relative flex bg-gray-200 p-8 w-100 max-md:w-full h-100 overflow-hidden max-md:mb-10'>
                <div className="flex flex-col justify-between">
                    <div className="text-2xl text-gray-500">
                        <p className="font-bold text-4xl">Playstation 5</p>
                        <p className="font-extralight">
                            Accessories
                        </p>
                        <img src="/icons/ps5.png" alt="" className="h-5 mt-10" />
                    </div>
                    <div>
                        <button className="bg-blue-500 shadow px-5 py-2 text-white font-bold cursor-pointer z-50">Browse More</button>
                    </div>
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743932294/ps-5_opp0gz.png" alt="" className='h-full absolute -right-25 z-10' />
                </div>
            </div>
            <div className="col-span-2 h-full">
                <Ps5Accessories setproductCategory={setproductCategory} setProductID={setProductID} setShowPopup={setShowPopup} />
            </div>
            <button className="absolute -top-20 right-2 bg-primary text-white py-2 px-4 uppercase shadow cursor-pointer flex gap-4 hover:bg-blue-700">
                <span><Rocket /></span>
                <span>Accessories</span>
            </button>

            <h1 className="absolute -top-40 text-9xl uppercase font-extrabold z-1 text-gray-200 max-md:text-4xl">
                Accessories
            </h1>
        </div>
    );
};

export default Ps5AccesoriesWidget;
