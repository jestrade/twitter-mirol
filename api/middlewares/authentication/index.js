const jwt = require("jsonwebtoken");
const config = require("./../../../config");
const response = require("./../../lib/response");

const authentication = (req, res, next) => {
    const token = req.headers["x-access-token"];
    try {
        const decoded = jwt.verify(token, config.jwtKey);
        const id = decoded.id; /*extraer del token decodificado, el id del usuario*/
        req.id = id; /*agregar al objeto request, el id del usuario recién obtenido*/
        next();
    } catch(e) {
        res.json(response(false, undefined, "No autorizado"));
    }
};

module.exports = authentication;

