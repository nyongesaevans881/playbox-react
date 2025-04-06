import { ScanEye } from "lucide-react";

const BestSellerCard = ({ product, handleAddToCart, handleProductClick }) => {  // Correct destructuring
    const percentageOff = Math.round(((product.prevPrice - product.nowPrice) / product.prevPrice) * 100);

    return (
        <div className="max-w-80 border border-gray-600 py-2 px-3 bg-gradient-to-b from-primary/20 to-primary/20 max-md:max-w-100 max-md:mx-2">
            <div className="best-seller-card-header" onClick={() => handleProductClick(product.productID, product.category)}>
                <div className="best-seller-card-platform">
                    <img src={product.platformIcon} alt={product.platform} />
                    {product.platform}
                </div>
                <div className="best-seller-card-icons" onClick={() => handleProductClick(product.productID, product.category)}>
                    <div className="percentage-off">{percentageOff}% OFF</div>
                    <i className="fa fa-heart-o"></i>
                </div>
            </div>
            <div className="best-seller-card-image" onClick={() => handleProductClick(product.productID, product.category)}>
                <img src={product.mainproductImage} alt={`${product.Title} ${product.SubTitle}`} />
            </div>
            <div className="best-seller-card-title" onClick={() => handleProductClick(product.productID, product.category)}>
                <h2 className="text-gray-300 text-2xl font-bold capitalize line-clamp-2">{product.Title}</h2>
                <h3 className="font-bold">{product.SubTitle}</h3>
            </div>
            <div className="best-seller-price" onClick={() => handleProductClick(product.productID, product.category)}>
                <div className="best-seller-discount-price">Ksh. {product.prevPrice.toLocaleString()}</div>
                <div className="best-seller-actual-price">Ksh. {product.nowPrice.toLocaleString()}</div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleProductClick(product.productID, product.category)}
                        className='border border-secondary p-1.5 text-secondary cursor-pointer'
                    >
                        <ScanEye className="h-6" />
                    </button>
                    <a
                        href={`/products/${product.category}/${product.subCategory}/${product.variant}/${product.name}`}
                        className="text-gray-200 flex gap-2 items-center border border-gray-200 py-1 px-2 text-md"
                    >
                        <i className="fa fa-external-link"></i>Specs
                    </a>
                </div>
                <button
                    className="bg-secondary font-bold px-2 py-1 cursor-pointer text-gray-200"
                    onClick={() => handleAddToCart(product.productID)}
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
};


export default BestSellerCard;
