
import './App.css';
import NavBar from './customer/component/navbar/NavigationBar';
import HomePage from './customer/Pages/HomePage';
import Footer from './customer/component/Footer/footer';
import Product from './customer/component/Product/Product';
function App() {
  return (
  <div>
    <NavBar ></NavBar>
  <div>
  { /* <HomePage/>  */ }  
    <Product></Product>
  </div>
      <Footer />
  </div> 
  );
}

export default App;
