import { Link } from 'react-router-dom';
import { getRecentlyViewed } from '../../utils/recentlyViewed';
import { productImage } from '../../api/products';
import { formatPrice } from '../../utils/format';

const PER_SLIDE = 4;

// Carrusel "Últimos productos vistos" (Bootstrap). No se muestra si todavía no se vio ningún producto.
const RecentlyViewed = () => {
    const items = getRecentlyViewed();
    if (items.length === 0) return null;

    const slides = [];
    for (let i = 0; i < items.length; i += PER_SLIDE) {
        slides.push(items.slice(i, i + PER_SLIDE));
    }

    return (
        <>
            <div className="carousel-title">
                <h2>Ultimos productos vistos</h2>
            </div>
            <div id="recentlyViewedCarousel" className="carousel slide">
                <div className="carousel-inner">
                    {slides.map((slide, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <div className="row">
                                {slide.map(product => (
                                    <div key={product._id} className="col-md-3">
                                        <Link to={`/item/${product._id}`} className="card">
                                            <img src={productImage(product)} className="card-img-top" alt={product.title} />
                                            <div className="card-body">
                                                <h3>{product.title}</h3>
                                                <p>$ UYU {formatPrice(product.price)}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {slides.length > 1 && (
                    <>
                        <button className="carousel-control-prev" type="button" data-bs-target="#recentlyViewedCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Anterior</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#recentlyViewedCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Siguiente</span>
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default RecentlyViewed;
