import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// En una app de React la página no se recarga al navegar, así que el scroll queda donde estaba:
// esto vuelve arriba cada vez que cambia la ruta.
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
