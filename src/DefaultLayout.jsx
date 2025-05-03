import React from 'react';
import Navbar from './pages/navigations/navbar/Navbar';
import Footer from './pages/navigations/footer/Footer';
import CartSidebar from './components/cartSidebar/CartSidebar';
import ContactSidebar from './components/contactSidebar/ContactSidebar';


const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <CartSidebar />
            <ContactSidebar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
