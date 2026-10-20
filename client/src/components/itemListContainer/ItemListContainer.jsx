import React, { useEffect, useState } from 'react';
import { useFetch } from '../../customHooks/useFetch';
import { useParams } from "react-router-dom";
import { getDocs, collection, query, where, limit, getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/client.js';
import ItemList from '../itemList/ItemList';
import './itemListContainer.css';


const ItemListContainer = () => {
  //const { data, loading, error } = useFetch('/productos.json');
  const { category } = useParams();
  const [ products, setProducts ] = useState([]);
  const [loading, setLoading] = useState(true);

  
  
  const getProducts = async () =>{
    try {
      const productsRef = collection(db, "products");
      //Si hay categoria la filtro
      const q = category ? query(productsRef, where("category", "==", category)) : productsRef;

      const data = await getDocs(q);
      const dataFiltrada = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(dataFiltrada);
      setProducts(dataFiltrada);
    } catch (error) {
      console.error("Error al traer los productos❌");
    } finally{
      setLoading(false);
    }
    
  }

  useEffect(() =>{
    getProducts();
  }, [category])

  if(loading){
    return <div>Cargando</div>
  }

 /* if(error){
    return <div>ERROR</div>
  }*/

  return (
      <ItemList products={products} />
  )
}
  
export default ItemListContainer;