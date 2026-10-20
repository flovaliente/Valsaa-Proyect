import { useEffect, useMemo, useState } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { getProducts } from '../../api/products';
import ItemList from '../itemList/ItemList';
import RecentlyViewed from '../recentlyViewed/RecentlyViewed';

const CATEGORIES = ['Blusa', 'Camisa', 'Chaleco', 'Buzo', 'Campera', 'Vestido', 'Pantalon', 'Pollera', 'Calzado'];

const sorters = {
  // El _id de Mongo incluye la fecha de creación y es incremental: sirve para ordenar por antigüedad
  recommended: (a, b) => a._id.localeCompare(b._id), // orden en que se cargó el catálogo
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  latest: (a, b) => b._id.localeCompare(a._id),
};

const ItemListContainer = () => {
  const { category } = useParams();
  const [ products, setProducts ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showFilters, setShowFilters] = useState(Boolean(category));
  const [sort, setSort] = useState('recommended');

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

  const sortedProducts = useMemo(() => [...products].sort(sorters[sort]), [products, sort]);

  return (
    <>
      <div className="filter-container">
        <button className="filter-button" onClick={() => setShowFilters(!showFilters)} aria-expanded={showFilters}>
          <i className="fas fa-filter"></i>Filtrar
        </button>

        <div className="dropdown">
          <select id="filter-options" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Ordenar productos">
            <option value="recommended">Recomendados</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="latest">Más Recientes</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <ul className="category-filter">
          <li><NavLink to="/shop" end>Todo</NavLink></li>
          {CATEGORIES.map(cat => (
            <li key={cat}><NavLink to={`/shop/${cat}`}>{cat}</NavLink></li>
          ))}
        </ul>
      )}

      {loading ? (
        <div className="status-message">Cargando...</div>
      ) : error ? (
        <div className="status-message">No pudimos cargar los productos. Probá de nuevo en un rato.</div>
      ) : sortedProducts.length === 0 ? (
        <div className="status-message">No hay productos en esta categoría.</div>
      ) : (
        <ItemList products={sortedProducts} />
      )}

      <RecentlyViewed />
    </>
  )
}

export default ItemListContainer;
