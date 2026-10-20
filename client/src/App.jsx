import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer';
import Cart from './components/cart/Cart';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import OrderSuccess from './components/orderSuccess/OrderSuccess';
import { ShopComponentContext } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <AuthProvider>
      <ShopComponentContext>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<ItemListContainer />} />
            <Route path='/category/:category' element={<ItemListContainer />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/item/:id' element={<ItemDetailContainer />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/order' element={<OrderSuccess />} />
          </Routes>
        </BrowserRouter>
      </ShopComponentContext>
    </AuthProvider>
  )
}

export default App
