const fs = require("fs");
const dates = require("./../../lib/dates");

const audits = (req, res, next) => {
    const date = dates.getColombianDate();
    const method = req.method;
    const path = req.path;
    const ip = req.ip;
    const id = req.id;
    const data = JSON.stringify(req.body);

    const linea = `${date}::${id}::${ip}::${method}::${path}::${data} \n`;

    const archivo = fs.createWriteStream("./logs/audits.log", { 'flags': 'a'});
    archivo.once("open", (f) => {
        archivo.write(linea);
    });
    
    next();
};

module.exports = audits;