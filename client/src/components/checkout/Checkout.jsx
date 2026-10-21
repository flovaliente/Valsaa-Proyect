import { useContext, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { getProfile } from '../../api/auth';
import { createOrder, getShippingOptions, payOrder } from '../../api/orders';
import BuyerStep from './BuyerStep';
import ShippingStep from './ShippingStep';
import PaymentStep from './PaymentStep';
import OrderSummary from './OrderSummary';

const STEPS = ['DATOS', 'ENVÍO', 'PAGO'];

const emptyBuyer = { firstName: '', lastName: '', email: '', phone: '' };
const emptyShipping = {
    method: null,
    store: 'pocitos',
    address: { street: '', apartment: '', city: '', department: '' },
};

const paymentErrorMessage = (error) => {
    if (error.status === 402) return 'El pago fue rechazado. Probá con otra tarjeta.';
    if (error.status === 409) return 'Algún producto ya no tiene stock suficiente. Revisá tu carrito.';
    return 'No pudimos procesar el pago. Probá de nuevo.';
};

const Checkout = () => {
    const { lista, totalPrice, cleanCart } = useContext(ShopContext);
    const { user } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [buyer, setBuyer] = useState(emptyBuyer);
    const [shipping, setShipping] = useState(emptyShipping);
    const [shippingOptions, setShippingOptions] = useState(null);
    const [order, setOrder] = useState(null); // orden creada en el server, para reintentar el pago
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    // Al terminar se vacía el carrito: esto evita que el checkout redirija al carrito vacío
    // antes de llegar a la pantalla de confirmación
    const completed = useRef(false);

    useEffect(() => {
        getShippingOptions().then(setShippingOptions).catch(() => setShippingOptions(null));
    }, []);

    // Con sesión, se completan los datos guardados en la cuenta
    useEffect(() => {
        if (!user) return;
        getProfile()
            .then(profile => {
                setBuyer(current => ({
                    firstName: current.firstName || profile.firstName,
                    lastName: current.lastName || profile.lastName,
                    email: profile.email,
                    phone: current.phone || profile.phone,
                }));
                if (profile.shippingAddress?.street) {
                    setShipping(current => ({ ...current, address: { ...emptyShipping.address, ...profile.shippingAddress } }));
                }
            })
            .catch(() => {});
    }, [user]);

    if (lista.length === 0 && !completed.current) {
        return <Navigate to="/cart" replace />;
    }

    const subtotal = totalPrice(lista);
    // Solo para mostrar: el costo que vale es el que calcula el server al crear la orden
    const deliveryCost = shippingOptions && subtotal < shippingOptions.freeShippingFrom ? shippingOptions.shippingCost : 0;
    const shippingCost = shipping.method === 'pickup' ? 0 : shipping.method === 'delivery' ? deliveryCost : null;

    const goBack = () => {
        setError(null);
        setOrder(null); // si cambian los datos, se crea una orden nueva
        setStep(step - 1);
    };

    const handlePay = async (card) => {
        setProcessing(true);
        setError(null);
        try {
            let current = order;
            if (!current) {
                current = await createOrder({
                    items: lista,
                    buyer,
                    shipping: shipping.method === 'pickup'
                        ? { method: 'pickup', store: shipping.store }
                        : { method: 'delivery', address: shipping.address },
                });
                setOrder(current);
            }

            const paidOrder = await payOrder(current.code, card);
            completed.current = true;
            cleanCart();
            navigate('/order', { state: { order: paidOrder } });
        } catch (e) {
            console.error('Error en el pago', e);
            if (e.status === 409) setOrder(null);
            setError(paymentErrorMessage(e));
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="cart-container checkout">
            <div className="cart-data fact-data">
                <ol className="checkout-steps">
                    {STEPS.map((label, index) => (
                        <li key={label} className={index === step ? 'active' : index < step ? 'done' : ''}>
                            <span>{index + 1}</span> {label}
                        </li>
                    ))}
                </ol>

                {step === 0 && <BuyerStep buyer={buyer} setBuyer={setBuyer} user={user} onNext={() => setStep(1)} />}
                {step === 1 && (
                    <ShippingStep
                        shipping={shipping}
                        setShipping={setShipping}
                        deliveryCost={deliveryCost}
                        freeShippingFrom={shippingOptions?.freeShippingFrom}
                        onBack={goBack}
                        onNext={() => setStep(2)}
                    />
                )}
                {step === 2 && (
                    <PaymentStep
                        total={subtotal + (shippingCost ?? 0)}
                        processing={processing}
                        error={error}
                        onBack={goBack}
                        onPay={handlePay}
                    />
                )}
            </div>

            <OrderSummary items={lista} subtotal={subtotal} shippingCost={shippingCost} />
        </div>
    );
};

export default Checkout;
