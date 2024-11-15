import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar'; 
import Sidebar from './Component/Sidebar';
import { Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Products from './Pages/Products';
import AddProduct from './Pages/AddProduct';
import { useParams } from 'react-router-dom';
import ProductDetails from './Pages/ProductDetails';
import EditProduct from './Pages/EditProduct';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className='row'>
          <div className='col-2 sidebar'>
            <Sidebar/>
          </div>
          <div className='col-10'>
          <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="products" element={<Products/>}/>
          <Route path="products/add" element={<AddProduct/>}/>
          <Route path="products/:productID" element={<ProductDetails/>}/>
          <Route path="products/edit/:productID" element={<EditProduct/>}/>
          </Routes>
          </div>

      </div>
    </div>
  );
}

export default App;
