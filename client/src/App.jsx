import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer';
import Cart from './components/cart/Cart';
import { ShopComponentContext } from './context/ShopContext';

function App() {

  return (
    <>
      <ShopComponentContext>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<ItemListContainer />} />
            <Route path='/category/:category' element={<ItemListContainer />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/item/:id' element={<ItemDetailContainer />} />
          </Routes>
          
        </BrowserRouter>
      </ShopComponentContext>
    </>
  )
}

export default App
