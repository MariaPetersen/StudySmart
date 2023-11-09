const bcrypt = require('bcrypt');
const jtw = require('jsonwebtoken');
const dotenv = require("dotenv");
const db = require("./../services/db");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

dotenv.config;

const KEY = process.env.RANDOM_KEY;


async function signup(req, res, next) {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const { lastname, firstname, email, username } = req.body;
        const result = await prisma.user.create({
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
    // .then(hash => db.query(`INSERT INTO User (lastname, firstname, email, username, password) 
    //             VALUES ('${req.body.lastname}', '${req.body.firstname}', '${req.body.email}', '${req.body.username}', '${hash}');`)
    //     .then(res.status(200).json("User created"))
    //     .catch(err => res.status(500).json({ err }))
    // )
    // .catch(err => res.status(500).json({ err }));

};

// app.post(`/post`, async (req, res) => {
//     const { title, content, authorEmail } = req.body;
//     const result = await prisma.post.create({
//         data: {
//             title,
//             content,
//             published: false,
//             author: { connect: { email: authorEmail } },
//         },
//     });
//     res.json(result);
// });

async function login(req, res, next) {
    const user = await db.query(`SELECT * FROM User WHERE email = '${req.body.email}'`);
    console.log(user);
    try {
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}

// exports.login = async (req, res, next) => {
//     try {
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(400).json(error);
//     }
// .then(user => {
// console.log(user);
// if (!user) {
//     res.status(400).json({ message: 'Paire login/mot de passe incorrecte' });
// };
// bcrypt.compare(req.body.password, user.password)
//     .then(valid => {
//         if (!valid) {
//             res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
//         };
//         res.status(201).json({
//             userId: user.id,
//             token: jtw.sign(
//                 { userId: user.id },
//                 `${KEY}`,
//                 { expiresIn: '24h' }
//             )
//         });
//     }
//     )
//     .catch(error => res.status(500).json({ error }));
// })
// .catch (error => res.status(500).json({ error }));
// };

module.exports = { signup };