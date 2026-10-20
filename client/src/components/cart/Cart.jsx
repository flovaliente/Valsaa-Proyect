import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { checkout } from '../../api/cart.js';
import { productImage } from '../../api/products.js';
import { formatPrice } from '../../utils/format.js';

const Cart = () =>{
    const { lista, setLista, totalPrice, updateQuantity, removeFromList } = useContext(ShopContext);
    const { user, logout } = useAuth();
    const [ processing, setProcessing ] = useState(false);
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();

    const total = totalPrice(lista);

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
                <div className="cart-data cart-details cart-empty">
                    <h2>DETALLE DEL PEDIDO</h2>
                    <p>Tu carrito está vacío.</p>
                    <Link to="/shop" className="btn btn-secondary">VER PRODUCTOS</Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="cart-container">
                <div className="cart-data fact-data">
                    <h2>DATOS DE LA CUENTA</h2>
                    {user ? (
                        <ul className="cart-items">
                            <li className="cart-item">
                                <span className="tit">Nombre:</span>
                                <span className="val">{user.firstName}</span>
                            </li>
                            <li className="cart-item">
                                <span className="tit">Email:</span>
                                <span className="val">{user.email}</span>
                            </li>
                        </ul>
                    ) : (
                        <p className="cart-guest">
                            Vas a poder <Link to="/login" state={{ from: '/cart' }}>ingresar</Link> o crear tu cuenta al finalizar la compra.
                        </p>
                    )}
                </div>

                <div className="cart-data cart-details">
                    <h2>DETALLE DEL PEDIDO</h2>
                    {user && (
                        <div className="cart-account">
                            <p>{user.email}</p>
                            <button className="link-button" onClick={logout}>Cambiar cuenta</button>
                        </div>
                    )}
                    <ul className="cart-items">
                        {lista.map((product) =>(
                            <li key={product._id} className="cart-item">
                                <div className="cart-item-info">
                                    <img src={productImage(product)} alt={product.title} className="cart-item-img" />
                                    <div className="cart-item-description">
                                        <h3>{product.title}</h3>
                                        <span>Art: {product.code}</span>
                                    </div>
                                </div>
                                <div className="cart-item-quantity">
                                    <button className="quantity-btn" aria-label="Restar uno" onClick={() => updateQuantity(product._id, product.quantity - 1)}>-</button>
                                    <span>{product.quantity}</span>
                                    <button className="quantity-btn" aria-label="Sumar uno" onClick={() => updateQuantity(product._id, product.quantity + 1)}>+</button>
                                </div>

                                <div className="cart-item-price">
                                    <span className="sim">$ UYU </span>
                                    <span className="amount">{formatPrice(product.price * product.quantity)}</span>
                                    <button className="link-button" aria-label={`Quitar ${product.title}`} onClick={() => removeFromList(product._id)}>
                                        <i className="fa-regular fa-trash-can"></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                        <li className="total-fila">
                            <div className="imp-tot">
                                <span>Importe total:</span>
                                <div>
                                    <span className="sim">$ UYU </span>
                                    <span className="amount">{formatPrice(total)}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    {error && <p className="cart-error">{error}</p>}
                </div>
            </div>

            <div className="cart-actions">
                <Link to="/shop" className="back-btn"><i className="fa-solid fa-arrow-left"></i>SEGUIR COMPRANDO</Link>
                <div>
                    <span className="sim">$ UYU </span>
                    <span className="amount">{formatPrice(total)}</span>
                </div>
                <button className="continue-btn" onClick={finishPurchase} disabled={processing}>
                    {processing ? 'PROCESANDO...' : 'FINALIZAR COMPRA'}<i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </>
    )
}

export default Cart;
