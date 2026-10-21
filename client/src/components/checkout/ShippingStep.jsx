import { STORES, DEPARTMENTS } from '../../data/stores';
import { formatPrice } from '../../utils/format';

// Paso 2: retiro en local o envío a domicilio
const ShippingStep = ({ shipping, setShipping, deliveryCost, freeShippingFrom, onBack, onNext }) => {
    const setAddressField = (e) =>
        setShipping({ ...shipping, address: { ...shipping.address, [e.target.name]: e.target.value } });

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form className="checkout-form" onSubmit={handleSubmit}>
            <label className="checkout-option">
                <input
                    type="radio"
                    name="method"
                    checked={shipping.method === 'pickup'}
                    onChange={() => setShipping({ ...shipping, method: 'pickup' })}
                />
                <span>
                    <strong>Retiro en local</strong> — Gratis
                </span>
            </label>
            {shipping.method === 'pickup' && (
                <div className="checkout-suboptions">
                    {STORES.map(store => (
                        <label key={store.id} className="checkout-option">
                            <input
                                type="radio"
                                name="store"
                                checked={shipping.store === store.id}
                                onChange={() => setShipping({ ...shipping, store: store.id })}
                            />
                            <span>
                                <strong>{store.name}</strong><br />
                                {store.address} {store.hours}
                            </span>
                        </label>
                    ))}
                </div>
            )}

            <label className="checkout-option">
                <input
                    type="radio"
                    name="method"
                    checked={shipping.method === 'delivery'}
                    onChange={() => setShipping({ ...shipping, method: 'delivery' })}
                />
                <span>
                    <strong>Envío a domicilio</strong> — {deliveryCost === 0 ? 'Gratis' : `$ UYU ${formatPrice(deliveryCost)}`}
                    {deliveryCost > 0 && freeShippingFrom && <> (gratis en compras desde $ UYU {formatPrice(freeShippingFrom)})</>}
                </span>
            </label>
            {shipping.method === 'delivery' && (
                <div className="checkout-suboptions">
                    <div className="checkout-field">
                        <label htmlFor="street">Calle y número</label>
                        <input id="street" name="street" autoComplete="address-line1" required value={shipping.address.street} onChange={setAddressField} />
                    </div>
                    <div className="checkout-field">
                        <label htmlFor="apartment">Apartamento (opcional)</label>
                        <input id="apartment" name="apartment" autoComplete="address-line2" value={shipping.address.apartment} onChange={setAddressField} />
                    </div>
                    <div className="checkout-field">
                        <label htmlFor="city">Ciudad / Barrio</label>
                        <input id="city" name="city" autoComplete="address-level2" required value={shipping.address.city} onChange={setAddressField} />
                    </div>
                    <div className="checkout-field">
                        <label htmlFor="department">Departamento</label>
                        <select id="department" name="department" required value={shipping.address.department} onChange={setAddressField}>
                            <option value="">Elegí un departamento</option>
                            {DEPARTMENTS.map(department => <option key={department} value={department}>{department}</option>)}
                        </select>
                    </div>
                </div>
            )}

            <div className="checkout-buttons">
                <button type="button" className="link-button checkout-link" onClick={onBack}><i className="fa-solid fa-arrow-left"></i> Volver</button>
                <button type="submit" className="btn btn-secondary" disabled={!shipping.method}>CONTINUAR</button>
            </div>
        </form>
    );
};

export default ShippingStep;
