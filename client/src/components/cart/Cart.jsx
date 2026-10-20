import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ShopContext } from '../../context/ShopContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { checkout } from '../../api/cart.js';
import { productImage } from '../../api/products.js';
import './cart.css';

const Cart = () =>{
    const { lista, setLista, totalPrice, updateQuantity, removeFromList } = useContext(ShopContext);
    const { user, logout } = useAuth();
    const [ processing, setProcessing ] = useState(false);
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();

    const finishPurchase = async () =>{
        // Sin sesión: primero login, y después vuelve acá
        if (!user) {
            return navigate('/login', { state: { from: '/cart' } });
        }

        setProcessing(true);
        setError(null);
        try {
            const { ticket, notProcessedProd } = await checkout(user.cart, lista);

            // Los productos sin stock suficiente quedan en el carrito
            const notProcessedIds = notProcessedProd.map(p => String(p.productId?._id ?? p.productId));
            const pending = lista.filter(prod => notProcessedIds.includes(prod._id));
            setLista(pending);

            navigate('/order', { state: { ticket, pending } });
        } catch (e) {
            console.error("Error al finalizar la compra", e);
            setError(e.status === 401 ? 'Tu sesión expiró. Volvé a ingresar para comprar.' : 'No pudimos procesar la compra. Probá de nuevo.');
        } finally {
            setProcessing(false);
        }
    }

    if (lista.length === 0) {
        return (
            <div className="cart-container">
                <div className="cart-details cart-empty">
                    <h2>DETALLE DEL PEDIDO</h2>
                    <p>Tu carrito está vacío.</p>
                    <Link to="/">Ver productos</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="cart-container">
            <div className="cart-details">
                <h2>DETALLE DEL PEDIDO</h2>
                <div className="cart-account">
                    {user ? (
                        <>
                            <p>{user.email}</p>
                            <button className="link-button" onClick={logout}>Cambiar cuenta</button>
                        </>
                    ) : (
                        <p>Vas a poder ingresar o crear tu cuenta al finalizar la compra.</p>
                    )}
                </div>

                <ul className="cart-items">
                    {lista.map((product) =>(
                        <li key={product._id} className="cart-item">
                            <div className="cart-item-info">
                                <img src={productImage(product)} alt={product.title} className="cart-item-img" />
                                <div className="cart-item-description">
                                    <h3>{product.title}</h3>
                                    <p className="product-code">Art: {product.code}</p>
                                </div>
                            </div>
                            <div className="cart-item-quantity">
                                <button className="quantity-btn" aria-label="Restar uno" onClick={() => updateQuantity(product._id, product.quantity - 1)}>-</button>
                                    <span>{product.quantity}</span>
                                <button className="quantity-btn" aria-label="Sumar uno" onClick={() => updateQuantity(product._id, product.quantity + 1)}>+</button>
                            </div>

                            <p>$ UYU {product.price * product.quantity}</p>

                            <button className="link-button" aria-label={`Quitar ${product.title}`} onClick={() => removeFromList(product._id)}>
                                <DeleteOutlineIcon fontSize="small" />
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="cart-summary">
                    <p className="cart-total">Total: $ UYU {totalPrice(lista)}</p>
                    {error && <p className="cart-error">{error}</p>}
                    <button className="btn btn-secondary" onClick={finishPurchase} disabled={processing}>
                        {processing ? 'Procesando...' : 'Finalizar compra'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart;
