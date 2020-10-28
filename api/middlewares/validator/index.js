const validator = require("./../../lib/validator");
const response = require("./../../lib/response");

const validateUsername = (req, res, next) => {

    next();
};
const validateTweet = (req, res, next) => {

    next();
};
const validateLogin = (req, res, next) => {

    next();
};
const validateNewUser = (req, res, next) => {
    const { name, username, password, passwordConfirmation, email } = req.body;
    const error = [];
    if (!validator.validateName(name)) error.push("Nombre no válido");
    if (!validator.validateEmail(email)) error.push("El correo no es válido");
    if (!validator.validateUsername(username)) error.push("El username no válido");
    if (!validator.validatePassword(password)) error.push("La contraseña no coincide con la política de contraseñas");
    if (!validator.validatePasswordMatch(password, passwordConfirmation)) error.push("La contraseña debe ser igual a la confirmación");

    if (error.length === 0)
        next();
    else
        res.status(501).json(response(false, undefined, error.join(",")));    
};
const validateNewTweet = (req, res, next) => {

    next();
};
module.exports = { validateUsername, validateLogin, validateNewUser, validateTweet, validateNewTweet};