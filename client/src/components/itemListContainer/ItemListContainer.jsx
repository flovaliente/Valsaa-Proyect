import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getProducts } from '../../api/products';
import ItemList from '../itemList/ItemList';
import './itemListContainer.css';


const ItemListContainer = () => {
  const { category } = useParams();
  const [ products, setProducts ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() =>{
    setLoading(true);
    setError(false);
    getProducts(category)
      .then(setProducts)
      .catch((e) => {
        console.error("Error al traer los productos", e);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [category])

  if(loading){
    return <div className="status-message">Cargando...</div>
  }

  if(error){
    return <div className="status-message">No pudimos cargar los productos. Probá de nuevo en un rato.</div>
  }

  if(products.length === 0){
    return <div className="status-message">No hay productos en esta categoría.</div>
  }

  return (
      <ItemList products={products} />
  )
}

export default ItemListContainer;
