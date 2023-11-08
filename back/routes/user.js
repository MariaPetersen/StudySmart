const bcrypt = require('bcrypt');
const jtw = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config;

const KEY = process.env.RANDOM_KEY;

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(
            hash => {
                //   save hash to database
            }
        )
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
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
                        userId: user._id,
                        token: jtw.sign(
                            { userId: user._id },
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