const response = require("./../../lib/response");

const authorization = (req, res, next) => {
    req.username === req.params.username ?
        next()
    :
        res.json(response(false, undefined, "No está autorizado para realizar esta acción"));    
};

module.exports = authorization;