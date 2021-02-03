const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../../models/users");
const config = require("./../../../config");
const response = require("./../../lib/response");

const login = (req, res) => {
    const { username, password } = req.body;

    User.find({ username: username }, ["name", "email", "password"])
        .then((users) => {
            const [user = {}] = users;
            const findUser = bcrypt.compareSync(password, user.password);
            if (findUser) {
                const id = user._id;
                const token = jwt.sign(
                    { id, username },
                    config.jwtKey,
                    {
                        expiresIn: config.jwtExp,
                    }
                );
                const { name, email } = user;
                res
                    .status(200)
                    .json(response(true, [{ user: { name, email }, token }]));
            } else {
                res.status(200).json(response(false, undefined, "Datos no válidos"));
            }
        })
        .catch((err) => {
            res.status(500).json(response(false, undefined, err));
        });
};

const read = async (req, res) => {
    try {
        const users = await User.find({}, ["name", "username"]);
        res.json(response(true, users));
    } catch (err) {
        res.json(response(false, undefined, err));
    }
};

const create = (req, res) => {
    const { name, username, password, email } = req.body;

    const saltRounds = bcrypt.genSaltSync(config.SALT);
    const passwordHashed = bcrypt.hashSync(password, saltRounds);

    const user = {
        name,
        username,
        email,
        password: passwordHashed,
    };

    User.find({ username: user.username })
        .then((users) => {
            if (users.length > 0) {
                res.json(
                    response(
                        false,
                        undefined,
                        "Ya existe un usuario con el mismo username"
                    )
                );
            } else {
                const obj = new User(user);
                obj
                    .save()
                    .then((user) => {
                        res.json(response(true, [user]));
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

    User.remove({ username: username })
        .then(() => {
            res.json(response(true, [{ message: "Usuario eliminado" }]));
        })
        .catch((err) => {
            res.json(response(false, undefined, err));
        });
};

const update = (req, res) => {
    const username = req.params.username;

    const user = {
        name: req.body.name,
        email: req.body.email,
    };

    User.findOneAndUpdate({ username: username }, user)
        .then((user) => {
            res.json(response(true, user));
        })
        .catch((err) => {
            res.json(response(false, undefined, err));
        });
};

const readOne = (req, res) => {
    const username = req.params.username;
    User.find({ username: username }, ["name", "username"])
        .then((users) => {
            res.json(response(true, users));
        })
        .catch((err) => {
            res.json(response(false, undefined, err));
        });
};

module.exports = { read, create, remove, update, readOne, login };
