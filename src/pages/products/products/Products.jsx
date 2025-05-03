import React, { useState, useEffect, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';
import ProductPopup from '../../../components/productsPopup/ProductsPopup';
import './products.css';
import Snackbar from '../../../components/snackHelper/Snackbar';
import toast from 'react-hot-toast';
import ProductsCard from '../../../components/productsCard/ProductsCard'
import FilterSidebar from '../../../components/filterSidebar/FilterSidebar';
import { ChevronsLeft, ChevronsRight, MoveLeftIcon } from 'lucide-react'

const ProductListPage = () => {
    const category = "";
    const dispatch = useDispatch();
    const productsState = useSelector((state) => state.products);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        price: { min: 0, max: Infinity },
        storage: [],
        condition: [],
        type: [],
        brand: [],
        rating: 0,
    });
    const [showPopup, setShowPopup] = useState(false);
    const [productID, setProductID] = useState(null);
    const [productCategory, setproductCategory] = useState(null);
    const [sortBy, setSortBy] = useState('best-selling');
    const [snackbar, setSnackbar] = useState({ visible: false, type: '', message: '' });
    const productsPerPage = 12;
    const allProducts = Object.values(productsState).flat();

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    // Separate useEffect for filtering that only runs when products/filters change
    useEffect(() => {
        if (!allProducts || allProducts.length === 0) return; // ✅ Prevent running if products aren't loaded

        let productsToFilter;
        if (category) {
            productsToFilter = allProducts.filter(
                (product) => product.category === category
            );
        } else {
            productsToFilter = getRandomProducts(allProducts, 100);
        }

        applyFilters(productsToFilter);
    }, [category, filters, sortBy]); // ✅ Ensure `allProducts` is a dependency



    const getRandomProducts = (products, count) => {
        if (!products || products.length === 0) {
            return [];
        }
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, shuffled.length));
    };

    // And modify your applyFilters function to use the new filter format:
    const applyFilters = (products) => {
        if (!products || products.length === 0) {
            setFilteredProducts([]);
            return;
        }

        let filtered = products.filter((product) => {
            const matchesPrice =
                product.nowPrice >= filters.price.min &&
                product.nowPrice <= filters.price.max;

            const matchesStorage =
                filters.storage.length === 0 ||
                filters.storage.includes(product.storage);

            const matchesCondition =
                filters.condition.length === 0 ||
                filters.condition.includes(product.condition);

            const matchesBrand =
                filters.brand.length === 0 ||
                filters.brand.includes(product.brand);

            const matchesRating =
                filters.rating === 0 ||
                (product.rating && parseFloat(product.rating) >= filters.rating);

            return matchesPrice && matchesStorage && matchesCondition && matchesBrand && matchesRating;
        });

        // Apply sorting (keep your existing sort code)
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


    // Handle Add to Cart click
    const handleAddToCart = (id) => {
        const product = allProducts.find((p) => p.productID === id);

        if (product) {
            dispatch(
                addToCart({
                    category: product.category,
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

    const paginate = (pageNumber) => {
        window.scrollTo(0, 0);
        setCurrentPage(pageNumber);
    }

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const goToPreviousPage = () => {
        window.scrollTo(0, 0);
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        window.scrollTo(0, 0);
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

export default ProductListPage;
