import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';
import ProductPopup from '../../../components/productsPopup/ProductsPopup';
import './category.css';
import Snackbar from '../../../components/snackHelper/Snackbar';
import ProductsCard from '../../../components/productsCard/ProductsCard'
import NoProducts from '../components/NoProducts'
import toast from 'react-hot-toast';

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
                    <a to="/" className="back-to-home"><i className="fa fa-long-arrow-left back-to-home-icon"></i> Back to Home</a>
                    <h1>
                        Home /&nbsp;
                        {category ? (category.charAt(0).toUpperCase() + category.slice(1)) : 'All Products'}
                    </h1>
                    <div className="sort-dropdown">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="best-selling">Best selling</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                        </select>
                    </div>
                </div>
                <div className="product-list-content">
                    <div className="filters-sidebar">
                        <div className="filters-header">

                        </div>
                        <h2>Filters</h2>
                        <div className="filter-section">
                            <h3>Price</h3>
                            <p>You can go upto: <span>Ksh. 80,000</span></p>
                            <div className="filter-section-input-item">
                                <h6>Min Price:</h6>
                                <input
                                    type="number"
                                    placeholder="0"
                                    onChange={(e) => handleFilterChange('price', { ...filters.price, min: Number(e.target.value) })}
                                />
                            </div>
                            <div className="filter-section-input-item">
                                <h6>Max Price:</h6>
                                <input
                                    type="number"
                                    placeholder="80,000"
                                    onChange={(e) => handleFilterChange('price', { ...filters.price, max: Number(e.target.value) })}
                                />
                            </div>
                        </div>
                        <div className="filter-section">
                            <h3>Storage</h3>
                            {['500GB', '1TB', '2TB'].map(size => (
                                <label key={size}>
                                    <input
                                        type="checkbox"
                                        value={size}
                                        onChange={(e) => {
                                            const newStorage = e.target.checked
                                                ? [...filters.storage, size]
                                                : filters.storage.filter(s => s !== size);
                                            handleFilterChange('storage', newStorage);
                                        }}
                                    />
                                    {size}
                                </label>
                            ))}
                        </div>
                        <div className="filter-section">
                            <h3>Condition</h3>
                            {['New', 'Used', 'Ex-UK'].map(condition => (
                                <label key={condition}>
                                    <input
                                        type="checkbox"
                                        value={condition}
                                        onChange={(e) => {
                                            const newCondition = e.target.checked
                                                ? [...filters.condition, condition]
                                                : filters.condition.filter(c => c !== condition);
                                            handleFilterChange('condition', newCondition);
                                        }}
                                    />
                                    {condition}
                                </label>
                            ))}
                        </div>

                        <div className="filter-section">
                            <h3>Rating</h3>
                            <input
                                type="range"
                                min="0"
                                max="5"
                                step="0.5"
                                value={filters.rating}
                                onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
                            />
                            <span>{filters.rating} stars</span>
                        </div>
                    </div>

                    <div className="products-details-grid">
                        {currentProducts.map((product, index) => (
                            <ProductsCard
                                key={index}
                                product={product}
                                handleAddToCart={handleAddToCart}
                                handleProductClick={handleProductClick}
                            />
                        ))}
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
