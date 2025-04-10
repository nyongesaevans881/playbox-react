import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/index';

import Index from "./pages/index";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { Toaster } from 'react-hot-toast';
import CartSidebar from './components/cartSidebar/CartSidebar';
import CartPage from './pages/cart/cart';
import ProductListPage from './pages/products/products/Products';
import Category from './pages/products/category/Category';
import SubCategory from './pages/products/subCategory/SubCategory';
import Variant from './pages/products/variant/Variant';
import Name from './pages/products/name/Name';
import CheckoutPage from './pages/checkout/Checkout';
import ScrollButtons from './components/ScrollButtons/ScrollButtons';
import BlogDetails from './pages/blog/BlogDetails';
import BlogDetailsV0 from './pages/blog/BlogDetailsV0';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Toaster position="top-right" />
        <Navbar />
        <CartSidebar />

        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/products' element={<ProductListPage />} />
          <Route path='/products/:category' element={<Category />} />
          <Route path='/products/:category/:subCategory' element={<SubCategory />} />
          <Route path='/products/:category/:subCategory/:variant' element={<Variant />} />
          <Route path='/products/:category/:subCategory/:variant/:name' element={<Name />} />

          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/blog/blogdetail' element={<BlogDetails />} />
          <Route path='/blog/blogdetailV0' element={<BlogDetailsV0 />} />
        </Routes>

        <ScrollButtons />

        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
