import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext.jsx';
import { db } from '../../firebase/client.js';
import { addDoc, collection } from 'firebase/firestore';
import './cart.css';

const Cart = () =>{
    const [ buyer, setBuyer ] = useState({ name: '', phone: '', email: '' });
    const { lista, totalPrice, cleanCart } = useContext(ShopContext);
    const navigate = useNavigate();

    const createOrder = () =>{
        const order = {
            buyer,
            items: lista,
            total: totalPrice(lista) 
        };
        console.log(order);

        const orderCollection = collection(db, 'orders');
        addDoc(orderCollection, order).then(({ id }) => {
            console.log(id);

            // Limpio los input
            setBuyer({ name: '', phone: '', email: '' });

            // Limpio carrito
            cleanCart();

            // Redirige a la pagina donde muestra la orden
            navigate(`/order/${id}`)
        }).catch((e) => console.error("Error al crear la orden: ", e));
    }

    useEffect(() =>{
        console.log("La lista: ", lista);
    }, [lista])
    

    return (
        <>
            <div className="cart-container">
                <div className="cart-details">
                    <h2>DETALLE DEL PEDIDO</h2>
                    <div className="cart-account">
                        <p>flovaliente143@gmail.com</p>
                        <a href="#">Cambiar cuenta</a>
                    </div>
                    
                    <ul className="cart-items">
                        {lista.map((product) =>(
                            <li key={product.id} className="cart-item">
                                <div className="cart-item-info">
                                    <img src={`${product.image}`} alt={`${product.name}`} className="cart-item-img" />
                                    <div className="cart-item-description">
                                        <h3>{product.name}</h3>
                                        <p className="product-code">Art: {product.code}</p>
                                    </div>
                                </div>
                                <div className="cart-item-quantity">
                                    <button className="quantity-btn">-</button>
                                        <span>{product.quantity}</span>
                                    <button className="quantity-btn">+</button>
                                </div>

                                <p>$ UYU  {product.price * product.quantity}</p>
                                        
                                <a id="cart-data"><i className="fa-regular fa-trash-can"></i></a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>Cart</div>
            <input type="text" placeholder='Nombre' value={buyer.name} onChange={(e) => setBuyer({ ...buyer, name: e.target.value})} />
            <input type="number" placeholder='Telefono' value={buyer.phone} onChange={(e) => setBuyer({ ...buyer, phone: e.target.value})} />
            <input type="text" placeholder='Email' value={buyer.email} onChange={(e) => setBuyer({ ...buyer, email: e.target.value})} />
            <button onClick={createOrder}>Finalizar Compra</button>
        </>
    )
}

export default Cart;