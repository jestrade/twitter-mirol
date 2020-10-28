const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../../models/users");
const config = require("./../../../config");
const response = require("./../../lib/response");

const login = (req, res) => {
    const { username, password } =  req.body;
    
    User.find({ username: username}, ["password"])
    .then((users) => {
        const findUser = bcrypt.compareSync(password, users[0].password);
        if (findUser) {
            const id = users[0]._id;
            const token = jwt.sign({ 
                exp: config.jwtExp,
                id, }, config.jwtKey);
            res.status(200).json(response(true, [{token}]));
        }else{
            res.status(500).json(response(false, undefined, "Datos no válidos"));
        }
    })
    .catch((errr) => {
        res.status(500).json(response(false, undefined, err));
    });
};


const read = async (req, res) => {
    try{
        const users = await User.find({}, ["name", "username"]);
        res.json(response(true, users));
    }catch(err){
        res.json(response(false, undefined, err));
    }
};

const create = (req, res)=>{

    const { name, username, password, passwordConfirmation, email } = req.body;

    const saltRounds = bcrypt.genSaltSync(config.SALT);
    const passwordHashed = bcrypt.hashSync(password, saltRounds);

    const user = {
        name,
        username,
        email,
        password: passwordHashed
    };

    User.find({ username: user.username})
    .then((users) => {
        if (users.length > 0){
            res.json(response(false, undefined, "Ya existe un usuario con el mismo username"))
        }else{
           const obj = new User(user);
           obj.save()
           .then((user) => {
               res.json(response(true, [user]))
           })
           .catch((err) => {
               res.json(response(false, undefined, err));
           });
        }
    })
    .catch((err) => {
        res.json(response(false, undefined, err));
    });
};

const remove = (req, res) => {
    const username = req.params.username;

    User.remove({username: username})
    .then(() => {
        res.json(response(true, [{message: "Usuario eliminado"}]));
    })
    .catch(() => {
        res.json(response(false, undefined, err));
    });
};

const update = (req, res) => {
    const username = req.params.username;

    const user = {
        name: req.body.name,
        email: req.body.email,
    };

    User.findOneAndUpdate({username: username}, user)
    .then((user) => {
        res.json(response(true, user));
    })
    .catch((err) => {
        res.json(response(false, undefined, err));
    });
};

const readOne = (req, res) => {
    const username = req.params.username;
    User.find({username: username}, ["name", "username"])
    .then((users) => {
        res.json(response(true, users));
    })
    .catch((err) => {
        res.json(response(false, undefined, err));
    });
};

module.exports = {read, create, remove, update, readOne, login};   