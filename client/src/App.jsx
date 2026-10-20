import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/home/Home';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer';
import Cart from './components/cart/Cart';
import Locales from './components/locales/Locales';
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
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<ItemListContainer />} />
              <Route path='/shop/:category' element={<ItemListContainer />} />
              <Route path='/item/:id' element={<ItemDetailContainer />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/locales' element={<Locales />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/order' element={<OrderSuccess />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </ShopComponentContext>
    </AuthProvider>
  )
}

export default App
