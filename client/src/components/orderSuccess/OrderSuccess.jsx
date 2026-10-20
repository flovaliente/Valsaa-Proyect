import { Link, Navigate, useLocation } from 'react-router-dom';
import { formatPrice } from '../../utils/format';
import { findStore } from '../../data/stores';

// Confirmación después de pagar. Recibe la orden por el state de la navegación.
const OrderSuccess = () => {
    const { state } = useLocation();
    const order = state?.order;

    if (!order) {
        return <Navigate to="/" replace />;
    }

    const { shipping, payment } = order;
    const store = shipping.method === 'pickup' ? findStore(shipping.store) : null;

    return (
        <div className="cart-container">
            <div className="cart-data cart-details cart-empty order-success">
                <h2>¡GRACIAS POR TU COMPRA, {order.buyer.firstName.toUpperCase()}!</h2>
                <p>Tu número de orden es <strong>{order.code}</strong>.</p>

                <ul className="order-items">
                    {order.items.map(item => (
                        <li key={item.product}>
                            {item.quantity} × {item.title} — $ UYU {formatPrice(item.price * item.quantity)}
                        </li>
                    ))}
                </ul>

                <p>
                    Envío: {order.shippingCost === 0 ? 'Gratis' : `$ UYU ${formatPrice(order.shippingCost)}`}<br />
                    <strong>Total pagado: $ UYU {formatPrice(order.total)}</strong>
                    {payment?.cardLast4 && <> con {payment.cardBrand} terminada en {payment.cardLast4}</>}
                </p>

                {store ? (
                    <p>Podés retirarla en <strong>{store.name}</strong>: {store.address} {store.hours}</p>
                ) : (
                    <p>
                        La enviamos a <strong>{shipping.address.street}{shipping.address.apartment && `, apto. ${shipping.address.apartment}`}</strong>,
                        {' '}{shipping.address.city}, {shipping.address.department}.
                    </p>
                )}

                <Link to="/shop" className="btn btn-secondary">SEGUIR COMPRANDO</Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
