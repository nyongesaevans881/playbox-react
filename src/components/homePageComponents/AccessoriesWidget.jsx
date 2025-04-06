import { MoveRightIcon } from "lucide-react";

const AccessoriesWidget = () => {
    return (
        <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1 max-md:mx-4">
            <div className="bg-gray-200 flex items-center px-8 justify-between">
                <p className="text-gray-700">Get all your <span className="font-bold text-blue-500">Xbox</span>  <br />Accessories</p>
                <div className="flex items-center gap-1">
                    <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743932294/xbox_ydfgsp.png" alt="" className="h-20" loading="lazy"/>
                    <MoveRightIcon className="text-gray-800 cursor-pointer" />
                </div>
            </div>
            <div className="bg-gray-200 flex items-center px-8 justify-between">
                <p className="text-gray-700">Get all your <span className="font-bold text-red-500">Nintendo</span><br /> Accessories</p>
                <div className="flex items-center gap-1">
                    <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743932294/switch_s226ur.png" alt="" className="h-20" loading="lazy"/>
                    <MoveRightIcon className="text-gray-800 cursor-pointer" />
                </div>
            </div>
            <div className="bg-gray-200 flex items-center px-8 justify-between">
                <p className="text-gray-700">Get all your <span className="font-bold text-black">Ps4</span> <br /> Accessories</p>
                <div className="flex items-center gap-1">
                    <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743932293/ps4_hthaqn.png" alt="" className="h-20" loading="lazy"/>
                    <MoveRightIcon className="text-gray-800 cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default AccessoriesWidget;
