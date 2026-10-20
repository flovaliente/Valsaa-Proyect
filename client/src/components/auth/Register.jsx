import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

const MIN_PASSWORD_LENGTH = 8;

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from ?? '/';

    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password.length < MIN_PASSWORD_LENGTH) {
            return setError(`La contraseña tiene que tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`);
        }

        setSubmitting(true);
        setError(null);
        try {
            await register(form);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.status === 409 ? 'Ya existe una cuenta con ese email.' : 'No pudimos crear la cuenta. Probá de nuevo.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>CREAR CUENTA</h2>

                <label htmlFor="firstName">Nombre</label>
                <input id="firstName" name="firstName" autoComplete="given-name" required value={form.firstName} onChange={handleChange} />

                <label htmlFor="lastName">Apellido</label>
                <input id="lastName" name="lastName" autoComplete="family-name" value={form.lastName} onChange={handleChange} />

                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange} />

                <label htmlFor="password">Contraseña</label>
                <input id="password" name="password" type="password" autoComplete="new-password" required minLength={MIN_PASSWORD_LENGTH} value={form.password} onChange={handleChange} />

                {error && <p className="auth-error">{error}</p>}

                <button type="submit" className="btn btn-secondary" disabled={submitting}>
                    {submitting ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>

                <p className="auth-switch">
                    ¿Ya tenés cuenta? <Link to="/login" state={{ from }}>Ingresar</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
