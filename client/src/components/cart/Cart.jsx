import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { productImage } from '../../api/products.js';
import { formatPrice } from '../../utils/format.js';

const Cart = () =>{
    const { lista, totalPrice, updateQuantity, removeFromList } = useContext(ShopContext);
    const { user, logout } = useAuth();
    const total = totalPrice(lista);

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
                            En el siguiente paso podés <Link to="/login" state={{ from: '/checkout' }}>ingresar</Link>, crear tu cuenta o seguir como invitado.
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
                </div>
            </div>

            <div className="cart-actions">
                <Link to="/shop" className="back-btn"><i className="fa-solid fa-arrow-left"></i>SEGUIR COMPRANDO</Link>
                <div>
                    <span className="sim">$ UYU </span>
                    <span className="amount">{formatPrice(total)}</span>
                </div>
                <Link to="/checkout" className="continue-btn">CONTINUAR<i className="fa-solid fa-arrow-right"></i></Link>
            </div>
        </>
    )
}

export default Cart;
