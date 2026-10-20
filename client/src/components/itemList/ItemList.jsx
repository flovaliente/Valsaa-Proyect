import React from "react";
import { Link } from 'react-router-dom';


const ItemList= ({ products }) => {

    return (
        <div className="table-responsive">
            {products.map((product) => (
                <div key={product.id} className="container-products">
                    <div className="products">
                        <Link to={`/item/${product.id}`}><img src={`${product.image}`} alt={`${product.name}`}/></Link>
                        <div className="product-description">
                            <h3>{product.name}</h3>
                        </div>
                    </div>
                </div>
                ))
            }
        </div>
    )
}
  
export default ItemList;