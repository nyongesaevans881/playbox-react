"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';
import ProductPopup from '../../../components/productsPopup/ProductsPopup';
import ProductsCard from '../../../components/productsCard/ProductsCard'
import FilterSidebar from '../../../components/filterSidebar/FilterSidebar';
import NoProducts from '../zero/NoProducts';
import { MoveLeftIcon } from 'lucide-react';

const SubCategory = ({ params }) => {
    const { subCategory, category } = useParams();
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
        if (subCategory) {
            productsToFilter = allProducts.filter(
                (product) => product.subCategory === subCategory
            );
        } else {
            productsToFilter = getRandomProducts(allProducts, 50);
        }

        applyFilters(productsToFilter);
    }, [subCategory, allProducts, filters, sortBy]);

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

    const handleProductClick = (id, productCategory) => {
        setproductCategory(productCategory)
        setProductID(id);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setProductID(null);
    };

    const handleAddToCart = (id) => {
        dispatch(addToCart(id));
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
                <div className="flex justify-between mb-5 max-md:flex-col gap-6 items-center">
                    <div className='text-gray-800 flex items-center gap-10'>
                        <a to="/" className="back-to-home cursor-pointer">
                            <MoveLeftIcon className='border-1 h-10 w-15 p-2 rounded-full' /> Back to Home
                        </a>
                        <h1>
                            Home /&nbsp;
                            {subCategory ? (subCategory.charAt(0).toUpperCase() + subCategory.slice(1)) : 'All Products'}
                        </h1>
                    </div>
                    <div className="bg-blue-500/50 text-gray-800 border border-blue-500 px-4 max-md:w-[80%]">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='w-full'>
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
        </section>
    );
};

export default SubCategory;
