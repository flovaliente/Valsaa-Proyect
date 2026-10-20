import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="top-bar">
                <span>Canjeá tus millas Itaú acá</span>
                <img src="/img/itau.png" alt="Itaú" className="itau-logo" />
            </div>

            <div className="social-footer">
                <ul>
                    <li><a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a></li>
                    <li><a href="#" aria-label="Instagram"><i className="fa-brands fa-square-instagram"></i></a></li>
                </ul>
            </div>

            <div className="footer-content">
                <div className="column clm-nosotros">
                    <div className="hdr">
                        <div className="tit">NOSOTROS</div>
                    </div>
                    <ul>
                        <li><a href="#">Empresa</a></li>
                        <li><Link to="/locales">Locales</Link></li>
                        <li><a href="#">Trabaja con nosotros</a></li>
                    </ul>
                </div>
                <div className="column clm-cuenta">
                    <div className="hdr">
                        <div className="tit">CUENTA</div>
                    </div>
                    <ul>
                        <li><Link to="/login">Mi cuenta</Link></li>
                        <li><a href="#">Mis compras</a></li>
                        <li><a href="#">Mis direcciones</a></li>
                        <li><a href="#">Wish List</a></li>
                    </ul>
                </div>
                <div className="column clm-compra">
                    <div className="hdr">
                        <div className="tit">COMPRA</div>
                    </div>
                    <ul>
                        <li><a href="#">Cómo comprar</a></li>
                        <li><a href="#">Envíos y devoluciones</a></li>
                        <li><a href="#">Preguntas frecuentes</a></li>
                    </ul>
                </div>
                <div className="column clm-newsletter">
                    <div className="hdr">
                        <div className="tit">SUMATE A NUESTRO NEWSLETTER</div>
                    </div>
                    {/* El newsletter todavía no está conectado a ningún servicio */}
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Ingresa tu e-mail" required />
                        <button type="submit" id="btn-submit">SUSCRIBIRME</button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
