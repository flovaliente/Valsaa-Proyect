import { productImage } from '../../api/products';
import { formatPrice } from '../../utils/format';

const OrderSummary = ({ items, subtotal, shippingCost }) => {
    return (
        <div className="cart-data cart-details">
            <h2>RESUMEN DEL PEDIDO</h2>
            <ul className="cart-items">
                {items.map(item => (
                    <li key={item._id} className="cart-item">
                        <div className="cart-item-info">
                            <img src={productImage(item)} alt={item.title} className="cart-item-img" />
                            <div className="cart-item-description">
                                <h3>{item.title}</h3>
                                <span>Cant.: {item.quantity}</span>
                            </div>
                        </div>
                        <div className="cart-item-price">
                            <span className="sim">$ UYU </span>
                            <span className="amount">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                    </li>
                ))}
                <li className="checkout-line">
                    <span>Subtotal</span>
                    <span>$ UYU {formatPrice(subtotal)}</span>
                </li>
                <li className="checkout-line">
                    <span>Envío</span>
                    <span>{shippingCost === null ? 'A elegir' : shippingCost === 0 ? 'Gratis' : `$ UYU ${formatPrice(shippingCost)}`}</span>
                </li>
                <li className="total-fila">
                    <div className="imp-tot">
                        <span>Total:</span>
                        <div>
                            <span className="sim">$ UYU </span>
                            <span className="amount">{formatPrice(subtotal + (shippingCost ?? 0))}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default OrderSummary;
