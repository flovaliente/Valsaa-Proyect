import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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

// El carrito tiene su propia barra fija abajo (total y botones), así que no lleva footer, igual que en el sitio original
const PAGES_WITHOUT_FOOTER = ['/cart'];

const ConditionalFooter = () => {
  const { pathname } = useLocation();
  return PAGES_WITHOUT_FOOTER.includes(pathname) ? null : <Footer />;
};

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
          <ConditionalFooter />
        </BrowserRouter>
      </ShopComponentContext>
    </AuthProvider>
  )
}

export default App
