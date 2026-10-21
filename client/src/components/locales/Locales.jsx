import { STORES } from '../../data/stores';

const MAP_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1156.6570387759032!2d-56.156271069010565!3d-34.91848987292875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f80ffc63bf7d3%3A0x6b321b2e355bec99!2sMontevideo%2C%20Departamento%20de%20Montevideo!5e0!3m2!1ses!2suy!4v1730164560907!5m2!1ses!2suy';

const Locales = () => {
    return (
        <div className="local-section">
            <h1>LOCALES</h1>
            <div className="local-container">
                <div className="local-info">
                    {STORES.map(local => (
                        <div key={local.id} className="local">
                            <img src={local.image} alt={local.name} className="local-image" />
                            <div className="local-details">
                                <h2>{local.name}</h2>
                                <p>{local.address}</p>
                                <p>{local.hours}</p>
                                <p>Teléfono: {local.phone}</p>
                                <p>store@valsaa.com</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="local-map">
                    <iframe
                        title="Mapa de locales"
                        src={MAP_URL}
                        width="400"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Locales;
