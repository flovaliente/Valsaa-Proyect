import { Link, Navigate, useLocation } from 'react-router-dom';
import { formatPrice } from '../../utils/format';

// Pantalla de confirmación después de comprar. Recibe el ticket por el state de la navegación.
const OrderSuccess = () => {
    const { state } = useLocation();

    if (!state?.ticket) {
        return <Navigate to="/" replace />;
    }

    const { ticket, pending } = state;

    return (
        <div className="cart-container">
            <div className="cart-data cart-details cart-empty">
                <h2>¡GRACIAS POR TU COMPRA!</h2>
                {ticket.amount > 0 ? (
                    <>
                        <p>Tu número de orden es <strong>{ticket.code}</strong>.</p>
                        <p>Total: $ UYU {formatPrice(ticket.amount)}</p>
                    </>
                ) : (
                    <p>No se pudo procesar ningún producto por falta de stock.</p>
                )}
                {pending.length > 0 && (
                    <p>
                        {pending.length === 1 ? 'Un producto quedó' : `${pending.length} productos quedaron`} en tu carrito porque no hay stock suficiente.
                        {' '}<Link to="/cart">Ver carrito</Link>
                    </p>
                )}
                <Link to="/shop" className="btn btn-secondary">SEGUIR COMPRANDO</Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
