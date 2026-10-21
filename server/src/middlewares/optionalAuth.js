import passport from "passport";

// Como passport.authenticate('jwt'), pero sin cortar el pedido si no hay sesión:
// si el token es válido deja el usuario en req.user, y si no, sigue como invitado.
export const optionalAuth = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (error, payload) => {
        req.user = !error && payload ? payload : undefined;
        next();
    })(req, res, next);
};
