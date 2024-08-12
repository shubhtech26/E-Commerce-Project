
import './App.css';
import NavBar from './customer/component/navbar/NavigationBar';
import HomePage from './customer/Pages/HomePage';
import Footer from './customer/component/Footer/footer';
import Product from './customer/component/Product/Product';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './customer/Pages/LoginPage';
import RegistrationPage from './customer/Pages/RegistrationPage';
import ProductDetail from './customer/component/ProductDetails/ProductDetail'
import Checkout from './customer/component/checkout/Checkout'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/auth/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegistrationPage /> } />
          {/* <Route path="/profile" element={ <ProfilePage /> } /> */}
          <Route path="/product_detail" element={ <ProductDetail /> } />
          <Route path="/checkout" element={<Checkout /> } />
          <Route path="/Mens" element={ <Product/> } />

      </Routes>
      < Footer />
    </Router>
  );
}

export default App;
