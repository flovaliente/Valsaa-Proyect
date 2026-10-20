import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getProductById } from '../../api/products';
import ItemDetail from '../itemDetail/ItemDetail.jsx';
import "./itemDetailContainer.css"



const ItemDetailContainer = () => {
    const { id } = useParams();
    const [ product, setProduct ] = useState(null);
    const [ error, setError ] = useState(false);

    useEffect(() =>{
        setError(false);
        getProductById(id)
            .then(setProduct)
            .catch((e) => {
                console.error("Error al traer el producto", e);
                setError(true);
            });
    }, [id])

    if (error) {
        return <div className="status-message">No encontramos este producto.</div>
    }

    if (!product) {
        return <div className="status-message">Cargando...</div>
    }

    return(
        <ItemDetail product={product} />
    )
}

export default ItemDetailContainer;
