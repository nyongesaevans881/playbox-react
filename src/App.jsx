import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/index';

import DefaultLayout from './DefaultLayout';
import PlainLayout from './PlainLayout';

import Index from "./pages/index";
import { Toaster } from 'react-hot-toast';
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
import ResetPasswordPage from './pages/password/Password';
import CheckoutSuccess from './pages/checkout/components/CheckoutSuccess/CheckoutSuccess';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Toaster position="top-right" />
        <ScrollButtons />

        <Routes>
          <Route path='/' element={<DefaultLayout><Index /></DefaultLayout>} />

          <Route path='/products' element={<DefaultLayout><ProductListPage /></DefaultLayout>} />
          <Route path='/products/:category' element={<DefaultLayout><Category /></DefaultLayout>} />
          <Route path='/products/:category/:subCategory' element={<DefaultLayout><SubCategory /></DefaultLayout>} />
          <Route path='/products/:category/:subCategory/:variant' element={<DefaultLayout><Variant /></DefaultLayout>} />
          <Route path='/products/:category/:subCategory/:variant/:name' element={<DefaultLayout><Name /></DefaultLayout>} />

          <Route path='/cart' element={<DefaultLayout><CartPage /></DefaultLayout>} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/checkout/success' element={<CheckoutSuccess />} />

          <Route path='/blog/blogdetail' element={<DefaultLayout><BlogDetails /></DefaultLayout>} />
          <Route path='/blog/blogdetailV0' element={<DefaultLayout><BlogDetailsV0 /></DefaultLayout>} />

          <Route path='/dashboard' element={<DefaultLayout><Dashboard /></DefaultLayout>} />
          <Route path='/dashboard/reset-password' element={<ResetPasswordPage />} />
        </Routes>

      </Router>
    </Provider>
  );
}

export default App;
