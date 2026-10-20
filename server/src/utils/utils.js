import jwt from 'jsonwebtoken';

// Se lee en cada uso (y no al importar el módulo) porque dotenv se carga después de los imports
const getPrivateKey = () => process.env.SECRET_KEY;

const generateToken = (user) =>{
    // Solo los datos necesarios: nunca incluir la contraseña (aunque esté hasheada) en el token
    const payload = { _id: user._id, firstName: user.firstName, email: user.email, role: user.role, cart: user.cart };
    const token = jwt.sign({ user: payload }, getPrivateKey(), { expiresIn: '1h' });
    return token;
};

const authToken = (req, res, next) =>{
    const authHeader = req.headers.authorization; //Token viene desde los headers

    if(!authHeader){ // si no hay header es porque no hay token, o sea no esta autenticado
        return res.status(401).send({
            error: "Not authenticated"
        });
    };

    const token = authHeader.split(' ')[1]; // el split es para sacar la palabra Bearer
    jwt.verify(token, getPrivateKey(), (error, credentials) =>{
        if(error){
            return res.status(403).send({
                error: "Unauthorized"
            });
        };
        req.user = credentials.user;
        next();
    })
}

export { generateToken, authToken };