import { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShopComponentContext = ({ children }) =>{
    const [lista, setLista] = useState([]);

    const totalPrice = (lista) =>{
        let total = 0;
        lista.forEach(prod => {
            total += prod.price * prod.quantity;
        });
        return total;
    }

    const cleanCart = () => setLista([]) 

    const addToList = (item, quantity) =>{
        console.log("Item: ", item);
        console.log("Quantity: ", quantity);

        

        const existingProd = lista.findIndex(prod => prod.id === item.id); //Devuelve -1 si el prod no esta en la lista
        if( existingProd != -1){
            const updated = [ ...lista ];
            updated[existingProd].quantity += quantity;
            setLista(updated); 
        }else{
            const cleanProd = {
                id: item.id,
                name: item.name,
                price: item.price,
                code: item.code,
                image: item.image,
                quantity
            }
            setLista([...lista, cleanProd]);
        }
    }

    return(
        <ShopContext.Provider value={{ lista, setLista, addToList, cleanCart, totalPrice }}>
            {children}
        </ShopContext.Provider>
    )
}