import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getProductById } from '../../api/products';
import { addRecentlyViewed } from '../../utils/recentlyViewed';
import ItemDetail from '../itemDetail/ItemDetail.jsx';



const ItemDetailContainer = () => {
    const { id } = useParams();
    const [ product, setProduct ] = useState(null);
    const [ error, setError ] = useState(false);

    useEffect(() =>{
        setError(false);
        setProduct(null);
        getProductById(id)
            .then((data) => {
                setProduct(data);
                addRecentlyViewed(data);
            })
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

    // key: al cambiar de producto se reinicia el estado del detalle (foto, cantidad)
    return(
        <ItemDetail key={product._id} product={product} />
    )
}

export default ItemDetailContainer;
