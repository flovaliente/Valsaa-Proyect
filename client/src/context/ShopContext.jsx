import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext();

// El carrito vive en el navegador (localStorage) para que se pueda comprar sin cuenta:
// recién al finalizar la compra se pide login y se pasa al server.
const STORAGE_KEY = 'valsaa-cart';

const loadCart = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
        return [];
    }
};

export const ShopComponentContext = ({ children }) =>{
    const [lista, setLista] = useState(loadCart);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
        } catch {
            // Sin localStorage (modo privado, etc.) el carrito funciona igual, solo que no persiste
        }
    }, [lista]);

    const totalPrice = (lista) => lista.reduce((total, prod) => total + prod.price * prod.quantity, 0);

    const totalItems = lista.reduce((total, prod) => total + prod.quantity, 0);

    const cleanCart = () => setLista([]);

    const addToList = (item, quantity) =>{
        const existingProd = lista.find(prod => prod._id === item._id);
        if (existingProd) {
            updateQuantity(item._id, existingProd.quantity + quantity);
        } else {
            const cleanProd = {
                _id: item._id,
                title: item.title,
                price: item.price,
                code: item.code,
                thumbnails: item.thumbnails,
                quantity
            };
            setLista([...lista, cleanProd]);
        }
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return removeFromList(id);
        setLista(lista.map(prod => prod._id === id ? { ...prod, quantity } : prod));
    };

    const removeFromList = (id) => setLista(lista.filter(prod => prod._id !== id));

    return(
        <ShopContext.Provider value={{ lista, setLista, addToList, updateQuantity, removeFromList, cleanCart, totalPrice, totalItems }}>
            {children}
        </ShopContext.Provider>
    )
}
