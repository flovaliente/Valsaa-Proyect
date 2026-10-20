import React, { useEffect ,useState } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';


const ItemDetail = ({ product }) => {
    const [ quantity, setQuantity ] = useState(1);
    const { lista ,addToList } = useContext(ShopContext);

    useEffect(() => {
        console.log("Carrito actualizado:", lista);
    }, [lista]);

    return (
        <div className="product-page">

            <div className="product-content">
                <div className="product-images">
                    <div className="thumbnails">
                        <img src={`${product.image}`} alt={`${product.name}`}/>
                        <img src={`${product.image}`} alt={`${product.name}`}/>
                        <img src={`${product.image}`} alt={`${product.name}`}/>
                    </div>
                    <div className="main-image">
                        <img src={`${product.image}`} alt={`${product.name}`}/>
                    </div>
                </div>
        
                <div className="product-details">
                    <h1>{product.name}</h1>
                    <p className="product-code">Art: {product.code}</p>
                    <div className="price-section">
                        <span className="sim">$ UYU </span>
                        <span className="amount">{product.price}</span>
                    </div>
                    <div className="product-options">
                        <div className="sizes">
                            <label htmlFor="sizes">Talle:</label>
                            <div className="size-options">
                                <button>S</button>
                                <button>M</button>
                                <button>L</button>
                            </div>
                        </div>
                        <div className="actions">
                            <button className="wishlist-button"><i className="fa-regular fa-heart"></i></button>
                            <div className="quantity">
                                <select id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} >
                                    <option value="1">Cant.: 1</option>
                                    <option value="2">Cant.: 2</option>
                                    <option value="3">Cant.: 3</option>
                                    <option value="4">Cant.: 4</option>
                                    <option value="5">Cant.: 5</option>
                                </select>
                            </div>
                            <button className="btn btn-secondary" onClick={() => addToList(product, quantity)}>COMPRAR</button>
                        </div>
                    </div>
            
                    
            
                    <div className="itau-button">
                        <button className="millas-button">
                            <img src="../public/img/itau.png" alt="Itau"/> CANJEÁ ACÁ TUS MILLAS ITAÚ
                        </button>
                    </div>
                    
                    <div className="shipping">
                        <p className="shipping-info"><i className="fa-solid fa-truck-fast"></i>MÉTODOS Y COSTOS DE ENVÍO</p>
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;