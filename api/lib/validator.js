const validateEmail = (email) => {
    const r = RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
    return r.test(email);
};

const validateName = (name) => {
    if (name.length < 2)
        return false;
        const r = RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$");
        return r.test(name);
};

const validateUsername = (username) => {
    if (username.length < 5)
        return false;
    const r = RegExp("^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$");
    return r.test(username);
};

const validatePasswordMatch = (password, passwordConfirmation) => {
    return password === passwordConfirmation ? true : false;
};

const validatePassword = (password) => {
    const r = RegExp("^(?:(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]))|(?:(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]))).{8,32}$");
    return r.test(password);
};

const validateTweet = (tweet) => {
    if (tweet.length < 2)
        return false;
    if (tweet.length > 230)
        return false;
    const r = RegExp("^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$");
    return r.test(tweet);

};

const validateNumber = (number) => {
    
};

module.exports = {
    validateEmail,
    validateName,
    validateUsername,
    validatePasswordMatch,
    validatePassword,
    validateNumber
};