import { useState } from 'react';
import { formatPrice } from '../../utils/format';
import { TEST_CARDS, formatCardNumber, formatExpiry, getCardBrand, isValidCardNumber, isValidExpiry, onlyDigits } from '../../utils/card';

// Paso 3: pago simulado. Valida la tarjeta en el navegador y solo entrega marca y últimos 4 dígitos.
const PaymentStep = ({ total, processing, error, onBack, onPay }) => {
    const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
    const [cardError, setCardError] = useState(null);

    const brand = getCardBrand(card.number);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const formatters = {
            number: formatCardNumber,
            expiry: formatExpiry,
            cvv: (v) => onlyDigits(v).slice(0, 4),
        };
        setCard({ ...card, [name]: formatters[name] ? formatters[name](value) : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValidCardNumber(card.number)) return setCardError('El número de tarjeta no es válido.');
        if (!brand) return setCardError('Aceptamos Visa, Mastercard, American Express y OCA.');
        if (!isValidExpiry(card.expiry)) return setCardError('La fecha de vencimiento no es válida.');
        if (card.cvv.length < 3) return setCardError('El código de seguridad no es válido.');

        setCardError(null);
        onPay({ cardBrand: brand, cardLast4: onlyDigits(card.number).slice(-4) });
    };

    return (
        <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="checkout-notice">
                <strong>Pago simulado:</strong> no se cobra nada. Para probar usá la tarjeta
                {' '}<code>{TEST_CARDS.approved}</code> (aprobada) o <code>{TEST_CARDS.rejected}</code> (rechazada),
                {' '}con cualquier vencimiento futuro y CVV.
            </div>

            <div className="checkout-cards">
                <img src="/img/visa.png" alt="Visa" />
                <img src="/img/mastercard.png" alt="Mastercard" />
            </div>

            <div className="checkout-field">
                <label htmlFor="number">Número de tarjeta {brand && <span className="checkout-brand">{brand}</span>}</label>
                <input id="number" name="number" inputMode="numeric" autoComplete="cc-number" required value={card.number} onChange={handleChange} placeholder="1234 5678 9012 3456" />
            </div>
            <div className="checkout-field">
                <label htmlFor="name">Nombre como figura en la tarjeta</label>
                <input id="name" name="name" autoComplete="cc-name" required value={card.name} onChange={handleChange} />
            </div>
            <div className="checkout-row">
                <div className="checkout-field">
                    <label htmlFor="expiry">Vencimiento</label>
                    <input id="expiry" name="expiry" inputMode="numeric" autoComplete="cc-exp" required value={card.expiry} onChange={handleChange} placeholder="MM/AA" />
                </div>
                <div className="checkout-field">
                    <label htmlFor="cvv">CVV</label>
                    <input id="cvv" name="cvv" inputMode="numeric" autoComplete="cc-csc" required value={card.cvv} onChange={handleChange} placeholder="123" />
                </div>
            </div>

            {(cardError || error) && <p className="checkout-error">{cardError || error}</p>}

            <div className="checkout-buttons">
                <button type="button" className="link-button checkout-link" onClick={onBack} disabled={processing}><i className="fa-solid fa-arrow-left"></i> Volver</button>
                <button type="submit" className="btn btn-secondary" disabled={processing}>
                    {processing ? 'PROCESANDO...' : `PAGAR $ UYU ${formatPrice(total)}`}
                </button>
            </div>
        </form>
    );
};

export default PaymentStep;
