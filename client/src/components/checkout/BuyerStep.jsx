import { Link } from 'react-router-dom';

const fields = [
    { name: 'firstName', label: 'Nombre', autoComplete: 'given-name' },
    { name: 'lastName', label: 'Apellido', autoComplete: 'family-name' },
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
    { name: 'phone', label: 'Teléfono', type: 'tel', autoComplete: 'tel' },
];

// Paso 1: datos de quien compra. Con sesión se completan solos; sin sesión se puede
// ingresar, crear cuenta o seguir como invitado.
const BuyerStep = ({ buyer, setBuyer, user, onNext }) => {
    const handleChange = (e) => setBuyer({ ...buyer, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form className="checkout-form" onSubmit={handleSubmit}>
            {!user && (
                <div className="checkout-login">
                    <p>¿Tenés cuenta? Ingresá para usar tus datos guardados.</p>
                    <div>
                        <Link to="/login" state={{ from: '/checkout' }} className="btn btn-secondary">INGRESAR</Link>
                        <Link to="/register" state={{ from: '/checkout' }} className="checkout-link">Crear cuenta</Link>
                    </div>
                    <p className="checkout-divider">o seguí como invitado</p>
                </div>
            )}

            {fields.map(field => (
                <div key={field.name} className="checkout-field">
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                        id={field.name}
                        name={field.name}
                        type={field.type ?? 'text'}
                        autoComplete={field.autoComplete}
                        required
                        // Con sesión el email es el de la cuenta
                        readOnly={Boolean(user) && field.name === 'email'}
                        value={buyer[field.name]}
                        onChange={handleChange}
                    />
                </div>
            ))}

            <div className="checkout-buttons">
                <Link to="/cart" className="checkout-link"><i className="fa-solid fa-arrow-left"></i> Volver al carrito</Link>
                <button type="submit" className="btn btn-secondary">CONTINUAR</button>
            </div>
        </form>
    );
};

export default BuyerStep;
