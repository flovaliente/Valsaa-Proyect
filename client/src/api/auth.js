import { http } from './http';

export const login = (email, password) =>
    http('/api/users/login', { method: 'POST', body: { email, password } });

export const register = (user) =>
    http('/api/users/register', { method: 'POST', body: user });

export const logout = () => http('/api/users/logout');

// Nombre, email, teléfono y dirección guardados, para completar el checkout
export const getProfile = async () => {
    const data = await http('/api/users/profile');
    return data.payload;
};

// Devuelve el usuario logueado o null si no hay sesión
export const getCurrentUser = async () => {
    try {
        const data = await http('/api/users/current');
        return data.user;
    } catch {
        return null;
    }
};
