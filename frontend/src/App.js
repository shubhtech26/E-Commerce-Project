
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';

// Redux Store
import { store, persistor } from './redux/store';

// Components
import Navbar from './components/layout/Navbar/Navbar';
import HomePage from './pages/customer/HomePage';
import Footer from './components/layout/Footer/footer.jsx';
import Product from './components/customer/Product/Product';
import LoginPage from './pages/customer/LoginPage';
import RegistrationPage from './pages/customer/RegistrationPage';
import ProductDetail from './components/customer/Product/ProductDetail';
import ProfilePage from './pages/customer/ProfilePage';

import Checkout from './components/customer/Checkout/Checkout';
import Cart from './components/customer/Cart/Cart';
import AdminDashboard from './components/admin/Dashboard/AdminDashboard';

// Styles
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-[96px]">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/products/:category/*" element={<Product />} />
                <Route path="/products" element={<Product />} />
              </Routes>
            </main>
            <Footer />
          </div>
          
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#4aed88',
                },
              },
            }}
          />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
