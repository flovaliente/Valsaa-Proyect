import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { productImage } from '../../api/products';
import { formatPrice } from '../../utils/format';


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
            <div className="text-with-border">
                <Link to="/shop" className="back-link"><i className="fa-solid fa-chevron-left"></i>Volver al listado</Link>
            </div>

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
                    <h1>{product.title.toUpperCase()}</h1>
                    <p className="product-code">Art: {product.code}</p>
                    <div className="price-section">
                        <span className="sim">$ UYU </span>
                        <span className="amount">{formatPrice(product.price)}</span>
                    </div>
                    <div className="product-options">
                        <div className="sizes">
                            <label htmlFor="sizes">Talle:</label>
                            <div className="size-options">
                                <button>XS</button>
                                <button>S</button>
                                <button>M</button>
                                <button>L</button>
                                <button>XL</button>
                            </div>
                        </div>
                        {maxQuantity > 0 ? (
                            <div className="actions">
                                <button className="wishlist-button" aria-label="Agregar a favoritos"><i className="fa-regular fa-heart"></i></button>
                                <div className="quantity">
                                    <select id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} >
                                        {Array.from({ length: maxQuantity }, (_, i) => i + 1).map(n => (
                                            <option key={n} value={n}>Cant.: {n}</option>
                                        ))}
                                    </select>
                                </div>
                                <button className="btn btn-secondary" onClick={handleAdd}>COMPRAR</button>
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
                        <p className="shipping-info"><i className="fa-solid fa-truck-fast"></i>MÉTODOS Y COSTOS DE ENVÍO</p>
                        <i className="fa-solid fa-plus"></i>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ItemDetail;
