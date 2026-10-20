import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="main-header">
                <div className="main-text">
                    <h1>IVA OFF</h1>
                    <p>+10% EXTRA con ITAÚ</p>
                </div>
            </div>

            <div className="container-img">
                <section className="reveal">
                    <Link to="/shop"><img src="/img/ini1.jpg" alt="New edition" /></Link>
                    <div className="text-image">
                        <h1>NEW EDITION</h1>
                        <p>-NIGHT OUT-</p>
                    </div>
                </section>

                <section className="reveal">
                    <Link to="/shop"><img src="/img/ini3.jpg" alt="New edition 2" /></Link>
                    <div className="text-image">
                        <h2>OWN THE NIGHT</h2>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;
