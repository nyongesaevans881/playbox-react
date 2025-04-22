import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';
import ProductPopup from '../../../components/productsPopup/ProductsPopup';
import Snackbar from '../../../components/snackHelper/Snackbar';
import ProductsCard from '../../../components/productsCard/ProductsCard'
import toast from 'react-hot-toast';
import NoProducts from '../zero/NoProducts';
import FilterSidebar from '../../../components/filterSidebar/FilterSidebar';
import { MoveLeftIcon } from 'lucide-react';

const Category = ({ params }) => {
    const { category } = useParams();
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products[category] || []);

    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        price: { min: 0, max: Infinity },
        storage: [],
        condition: [],
        type: [],
        rating: 0,
    });
    const [showPopup, setShowPopup] = useState(false);
    const [productID, setProductID] = useState(null);
    const [sortBy, setSortBy] = useState('best-selling');
    const [productCategory, setproductCategory] = useState(null);
    const [snackbar, setSnackbar] = useState({ visible: false, type: '', message: '' });

    const productsPerPage = 12;

    const getRandomProducts = (products, count) => {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    // Apply Filters and Sorting Directly
    let filteredProducts = getRandomProducts(allProducts, 50).filter((product) => {
        return (
            product.nowPrice >= filters.price.min &&
            product.nowPrice <= filters.price.max &&
            (filters.storage.length === 0 || filters.storage.includes(product.storage)) &&
            (filters.condition.length === 0 || filters.condition.includes(product.condition))
        );
    });

    // Apply Sorting
    filteredProducts.sort((a, b) => {
        if (sortBy === 'price-low-high') return a.nowPrice - b.nowPrice;
        if (sortBy === 'price-high-low') return b.nowPrice - a.nowPrice;
        return 0; // Default to no sorting (best-selling)
    });

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
        setCurrentPage(1); // Reset to first page when filters change
    };

    const handleProductClick = (id, productCategory) => {
        setproductCategory(productCategory)
        setProductID(id);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setProductID(null);
    };


    // Handle Add to Cart click
    const handleAddToCart = (id) => {
        const product = filteredProducts.find((p) => p.productID === id);
        if (product) {
            dispatch(
                addToCart({
                    productId: id,
                    color: product.defaultColor || 'default',
                })
            );
            toast.success('Item added to cart successfully!');
        } else {
            toast.error('Product not found!');
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="product-list-container-wrapper">
            <div className="product-list-container container">
                <div className="product-list-header">
                <a to="/" className="back-to-home cursor-pointer">
                        <MoveLeftIcon className='border-1 h-10 w-15 p-2 rounded-full' /> Back to Home
                    </a>
                    <h4 className='bg-blue-500/40 border border-blue-500 text-gray-800 px-4'>
                        Home /&nbsp;
                        {category ? (category.charAt(0).toUpperCase() + category.slice(1)) : 'All Products'}
                    </h4>
                    <div className="sort-dropdown">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="best-selling">Best selling</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                        </select>
                    </div>
                </div>
                <div className="product-list-content">
                    <FilterSidebar
                        products={allProducts}
                        initialFilters={filters}
                        onFilterChange={(newFilters) => {
                            setFilters(newFilters);
                        }}
                        maxPrice={80000}
                    />

                    <div className="products-details-grid">
                        {currentProducts.length === 0 ? (
                            <div className='col-span-3'>
                                <NoProducts />
                            </div>
                        ) : (
                            currentProducts.map((product, index) => (
                                <ProductsCard
                                    key={index}
                                    product={product}
                                    handleAddToCart={handleAddToCart}
                                    handleProductClick={handleProductClick}
                                />
                            ))
                        )}
                    </div>
                </div>
                <div className="pagination">
                    {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
                        <button key={i} onClick={() => paginate(i + 1)}>
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
            {showPopup && <ProductPopup productId={productID} productCategory={productCategory} onClose={closePopup} />}
            {snackbar.visible && (
                <Snackbar
                    type={snackbar.type}
                    message={snackbar.message}
                    onClose={() => setSnackbar({ visible: false, type: '', message: '' })}
                    displayTime={1000}
                />
            )}
        </section>
    );
};

export default Category;
