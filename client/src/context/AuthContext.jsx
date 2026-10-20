import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // true hasta saber si hay una sesión abierta

    useEffect(() => {
        authApi.getCurrentUser()
            .then(setUser)
            .finally(() => setLoading(false));
    }, []);

    const login = async (email, password) => {
        await authApi.login(email, password);
        setUser(await authApi.getCurrentUser());
    };

    const register = async (newUser) => {
        await authApi.register(newUser);
        await login(newUser.email, newUser.password);
    };

    const logout = async () => {
        await authApi.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
