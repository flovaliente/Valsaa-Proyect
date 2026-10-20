import { Link } from 'react-router-dom';
import { productImage } from "../../api/products";
import { formatPrice } from '../../utils/format';


const ItemList= ({ products }) => {

    return (
        <div className="table-responsive">
            {products.map((product) => (
                <div key={product._id} className="container-products">
                    <div className="products">
                        <Link to={`/item/${product._id}`}><img src={productImage(product)} alt={product.title}/></Link>
                        <div className="product-description">
                            <h3>{product.title}</h3>
                            <span>$ UYU {formatPrice(product.price)}</span>
                        </div>
                    </div>
                </div>
                ))
            }
        </div>
    )
}

export default ItemList;
