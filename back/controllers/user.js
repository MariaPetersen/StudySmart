const bcrypt = require('bcrypt');
const jtw = require('jsonwebtoken');
const dotenv = require("dotenv");
const db = require("./../services/db");
dotenv.config;

const KEY = process.env.RANDOM_KEY;

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => db.query(`INSERT INTO User (lastname, firstname, email, username, password) 
                    VALUES ('${req.body.lastname}', '${req.body.firstname}', '${req.body.email}', '${req.body.username}', '${hash}');`)
            .then(res.status(200).json("User created"))
            .catch(err => res.status(500).json({ err }))
        )
        .catch(err => res.status(500).json({ err }));

};

exports.login = (req, res, next) => {
    db.query(
        `SELECT * FROM User WHERE email = '${req.body.email}'`
    )
        .then(user => {
            if (!user) {
                res.status(400).json({ message: 'Paire login/mot de passe incorrecte' });
            };
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    };
                    res.status(201).json({
                        userId: user.id,
                        token: jtw.sign(
                            { userId: user.id },
                            `${KEY}`,
                            { expiresIn: '24h' }
                        )
                    });
                }
                )
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};