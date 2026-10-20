import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from ?? '/';

    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await login(form.email, form.password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.status === 401 ? 'Email o contraseña incorrectos.' : 'No pudimos iniciar sesión. Probá de nuevo.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>INGRESAR</h2>
                {from === '/cart' && <p className="auth-hint">Ingresá para finalizar tu compra.</p>}

                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange} />

                <label htmlFor="password">Contraseña</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required value={form.password} onChange={handleChange} />

                {error && <p className="auth-error">{error}</p>}

                <button type="submit" className="btn btn-secondary" disabled={submitting}>
                    {submitting ? 'Ingresando...' : 'Ingresar'}
                </button>

                <p className="auth-switch">
                    ¿No tenés cuenta? <Link to="/register" state={{ from }}>Crear cuenta</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
