
import './App.css';
import NavBar from './customer/component/navbar/NavigationBar';
import HomePage from './customer/Pages/HomePage';
import Footer from './customer/component/Footer/footer';
import Product from './customer/component/Product/Product';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './customer/Pages/LoginPage';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
          <Route path="/login" element={ <LoginPage /> } />
      </Routes>
      < HomePage />
      < Footer />
    </Router>
  );
}

export default App;
