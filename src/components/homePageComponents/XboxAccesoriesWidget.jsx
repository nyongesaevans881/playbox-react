import XboxAccesories from "../carousels/xboxAccesories/xboxAccesories";

const XboxAccesoriesWidget = () => {
    return (
        <div className="items-center relative max-md:grid max-md:grid-cols-1 max-md:mx-4 pb-10 z-0">
            <div className="h-full">
                <XboxAccesories />
            </div>
        </div>
    );
};

export default XboxAccesoriesWidget;
