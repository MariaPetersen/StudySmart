const bcrypt = require('bcrypt');
const jtw = require('jsonwebtoken');
const dotenv = require("dotenv");
const prisma = require("./../prisma/prisma");
const userDatabase = require("./../services/database/userDatabase");

dotenv.config;

const KEY = process.env.RANDOM_KEY;

async function signup(req, res, next) {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const { lastname, firstname, email, username } = req.body;
        const result = await userDatabase.createUser({
            data: {
                lastname: lastname,
                firstname: firstname,
                email: email,
                username: username,
                password: hash
            }
        });
        res.status(200).json("User was created");
    } catch (error) {
        res.status(500).json(error);
    }
};

async function login(req, res, next) {
    try {
        const user = await userDatabase.getOneUser({
            where: {
                email: req.body.email
            }
        });
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                } else {
                    res.status(201).json({
                        userId: user.id,
                        token: jtw.sign(
                            { userId: user.id },
                            `${KEY}`,
                            { expiresIn: '24h' }
                        )
                    });
                }
            }
            )
            .catch(error => res.status(500).json({ error }));

    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { signup, login };