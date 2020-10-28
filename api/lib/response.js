const response = (success, items, message) => {
    return {
        success,
        message,
        items
    }
};
module.exports = response;