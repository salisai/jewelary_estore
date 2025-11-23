import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Auth from './pages/Auth';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const SuccessPage = () => (
  <div className="h-[80vh] flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-4xl font-serif mb-4">Thank You.</h1>
    <p className="text-gray-600 mb-8">Your order has been received and is being crafted.</p>
    <a href="#/" className="bg-black text-white px-8 py-3 uppercase tracking-widest text-sm">Return Home</a>
  </div>
);

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          {/* header */}
          <Navbar />
         
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <footer className="bg-white border-t border-gray-100 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-2xl font-serif font-bold">Lumière</div>
              <div className="flex gap-8 text-sm text-gray-500 uppercase tracking-wider">
                <a href="#" className="hover:text-black">Shipping</a>
                <a href="#" className="hover:text-black">Contact</a>
                <a href="#" className="hover:text-black">Privacy</a>
              </div>
              <div className="text-xs text-gray-400">© 2024 Lumière Jewelry</div>
            </div>
          </footer>
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;