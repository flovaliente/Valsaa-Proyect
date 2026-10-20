import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getDocs, collection, query, where, limit, getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/client.js';
import ItemDetail from '../itemDetail/ItemDetail.jsx';
import "./itemDetailContainer.css"



const ItemDetailContainer = () => {
    const { id } = useParams();
    const [ product, setProduct ] = useState([]);
    
    
    //PARA TRAER SOLO UN PRODUCTO DE LA BASE DE DATOS
    const productRef = doc(db, 'products', id);

    const getProduct = () =>{
        getDoc(productRef).then((snapshot =>{
        if(snapshot.exists()){
            const productData = { id: snapshot.id, ...snapshot.data() };
            console.log( productData);
            setProduct(productData);
        }
        }))
    }

    useEffect(() =>{
        getProduct();
    }, [])


    return(
        <ItemDetail product={product} />
    )
}
  
export default ItemDetailContainer;