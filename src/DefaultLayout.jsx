import React from 'react';
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import CartSidebar from './components/cartSidebar/CartSidebar';


const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <CartSidebar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
