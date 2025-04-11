import XboxAccesories from "../carousels/xboxAccesories/XboxAccesories";

const XboxAccesoriesWidget = ({ setproductCategory, setProductID, setShowPopup }) => {
    return (
        <div className="items-center relative max-md:grid max-md:grid-cols-1 max-md:mx-4 pb-10 z-0">
            <div className="h-full">
                <XboxAccesories setproductCategory={setproductCategory} setProductID={setProductID} setShowPopup={setShowPopup}/>
            </div>
        </div>
    );
};

export default XboxAccesoriesWidget;
