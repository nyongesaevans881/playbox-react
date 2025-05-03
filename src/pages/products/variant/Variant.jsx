"use client";

import React, { useState, useEffect, use } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';
import ProductPopup from '../../../components/productsPopup/ProductsPopup';
import ProductsCard from '../../../components/productsCard/ProductsCard'
import { ChevronsLeft, ChevronsRight, MoveLeftIcon } from 'lucide-react';
import NoProducts from '../zero/NoProducts';
import FilterSidebar from '../../../components/filterSidebar/FilterSidebar';

const Variant = ({ params }) => {
    const { variant, category, subCategory } = useParams();
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products[category] || []);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productCategory, setproductCategory] = useState(null);
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

    const productsPerPage = 12;

    useEffect(() => {
        let productsToFilter;
        if (variant) {
            productsToFilter = allProducts.filter(
                (product) => product.subCategory.includes(subCategory) && product.variant === variant
            );
        } else {
            productsToFilter = getRandomProducts(allProducts, 50);
        }

        applyFilters(productsToFilter);
    }, [variant, allProducts, filters, sortBy]);

    const getRandomProducts = (products, count) => {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const applyFilters = (products) => {
        let filtered = products.filter((product) => {
            return (
                product.nowPrice >= filters.price.min &&
                product.nowPrice <= filters.price.max &&
                (filters.storage.length === 0 || filters.storage.includes(product.storage)) &&
                (filters.condition.length === 0 || filters.condition.includes(product.condition))
            );
        });

        // Add sorting
        filtered.sort((a, b) => {
            if (sortBy === 'price-low-high') return a.nowPrice - b.nowPrice;
            if (sortBy === 'price-high-low') return b.nowPrice - a.nowPrice;
            return 0; // Default to no sorting (best-selling)
        });

        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
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

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    return (
        <section className="product-list-container-wrapper">
            <div className="product-list-container container">
                <div className="flex justify-between mb-5 max-md:flex-col gap-6 items-center">
                    <div className='text-gray-800 flex items-center gap-10 max-md:gap-2 max-md:justify-between max-md:w-[100%]'>
                        <a to="/" className="back-to-home cursor-pointer">
                            <MoveLeftIcon className='border-1 h-10 w-15 p-2 rounded-full' /> <span className='max-md:hidden'>Back to </span>Home
                        </a>
                        <h1>
                            Home /&nbsp;
                            {category ? (category.charAt(0).toUpperCase() + category.slice(1)) : 'All Products'}
                        </h1>
                    </div>
                    <div className="bg-blue-500/50 text-gray-800 border border-blue-500 max-md:w-[100%] h-10">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='w-full bg-blue-500/50 text-gray-800 h-full products-select-input sort-dropdown'>
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
                <div className="text-gray-500 flex gap-4 max-md:gap-1 justify-center mt-12 items-center">
                    <button onClick={goToPreviousPage} disabled={currentPage === 1} >
                        <ChevronsLeft className={`border-1 border-blue-500 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => paginate(i + 1)}
                            className={`border-1 border-blue-500 w-8 text-blue-500 font-bold cursor-pointer hover:bg-blue-500 hover:text-white ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                        <ChevronsRight className={`border-1 border-blue-500 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`} />
                    </button>
                </div>
            </div>
            {showPopup && <ProductPopup productId={productID} productCategory={productCategory} onClose={closePopup} />}
        </section>
    );
};

export default Variant;
