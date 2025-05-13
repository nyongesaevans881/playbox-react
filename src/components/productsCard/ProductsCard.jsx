import { ScanEye } from "lucide-react";

const ProductsCard = ({ product, handleAddToCart, handleProductClick }) => {  // Correct destructuring

    return (
        <div className="product-list-card-item">
            <div className="product-list-card-header" onClick={() => handleProductClick(product.productID, product.category)}>
                <div className="product-list-card-platform">
                    <img src={product.platformIcon} alt={product.platform} />
                    {product.platform}
                </div>
                <div className="product-list-card-icons">
                    <div className="product-list-percentage-off font-bold">
                        {Math.round((product.prevPrice - product.nowPrice) / product.prevPrice * 100)}% OFF
                    </div>
                    <i className="fa fa-heart-o"></i>
                </div>
            </div>
            <div className="product-list-card-image" onClick={() => handleProductClick(product.productID, product.category)}>
                <img src={product.mainproductImage} alt={`${product.Title} ${product.SubTitle}`} />
            </div>
            <div className="product-list-card-title" onClick={() => handleProductClick(product.productID, product.category)}>
                <h1 className='line-clamp-2 text-md text-gray-700 font-extrabold uppercase'>{product.Title}</h1>
                <h3 className="capitalize">{product.SubTitle}</h3>
            </div>
            <div className="product-list-price" onClick={() => handleProductClick(product.productID, product.category)}>
                <div className="product-list-discount-price">Ksh. {product.prevPrice.toLocaleString()}</div>
                <div className="product-list-actual-price">Ksh. {product.nowPrice.toLocaleString()}</div>
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
                        className="text-gray-600 flex gap-2 items-center border border-gray-200 py-1 px-2 text-md"
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


export default ProductsCard;
