import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddIcon from '@mui/icons-material/Add';
import { ShopContext } from '../../context/ShopContext';
import { productImage } from '../../api/products';


const ItemDetail = ({ product }) => {
    const [ quantity, setQuantity ] = useState(1);
    const [ selectedImage, setSelectedImage ] = useState(0);
    const [ added, setAdded ] = useState(false);
    const { addToList } = useContext(ShopContext);

    const maxQuantity = Math.min(5, product.stock);

    const handleAdd = () => {
        addToList(product, quantity);
        setAdded(true);
    };

    return (
        <div className="product-page">

            <div className="product-content">
                <div className="product-images">
                    <div className="thumbnails">
                        {product.thumbnails.map((thumbnail, index) => (
                            <img
                                key={thumbnail}
                                src={productImage(product, index)}
                                alt={`${product.title} - foto ${index + 1}`}
                                onClick={() => setSelectedImage(index)}
                            />
                        ))}
                    </div>
                    <div className="main-image">
                        <img src={productImage(product, selectedImage)} alt={product.title}/>
                    </div>
                </div>

                <div className="product-details">
                    <h1>{product.title}</h1>
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
                        {maxQuantity > 0 ? (
                            <div className="actions">
                                <button className="wishlist-button" aria-label="Agregar a favoritos"><FavoriteBorderIcon fontSize="small" /></button>
                                <div className="quantity">
                                    <select id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} >
                                        {Array.from({ length: maxQuantity }, (_, i) => i + 1).map(n => (
                                            <option key={n} value={n}>Cant.: {n}</option>
                                        ))}
                                    </select>
                                </div>
                                <button className="btn btn-secondary" onClick={handleAdd}>AGREGAR AL CARRITO</button>
                            </div>
                        ) : (
                            <p className="out-of-stock">Sin stock</p>
                        )}
                        {added && (
                            <p className="added-message">
                                Agregado al carrito. <Link to="/cart">Ver carrito</Link>
                            </p>
                        )}
                    </div>



                    <div className="itau-button">
                        <button className="millas-button">
                            <img src="/img/itau.png" alt="Itau"/> CANJEÁ ACÁ TUS MILLAS ITAÚ
                        </button>
                    </div>

                    <div className="shipping">
                        <p className="shipping-info"><LocalShippingIcon fontSize="small" /> MÉTODOS Y COSTOS DE ENVÍO</p>
                        <AddIcon fontSize="small" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ItemDetail;
