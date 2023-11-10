const dotenv = require("dotenv");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createPublication(req, res, next) {
    try {
        console.log("here");
        const { userId } = req.auth;
        console.log(userId);
        const profile = await prisma.profile.findFirst({
            where: {
                user_id: userId
            }
        });
        console.log(profile.id);
        const { title, description, text } = req.body;
        console.log(title);
        console.log(description);
        console.log(text);
        const publication = await prisma.publication.create({
            data: {
                profile_id: profile.id,
                title: title,
                description: description,
                date: date,
                text: text,
                link: "http"
            }
        });
        res.status(200).json(publication);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { createPublication };