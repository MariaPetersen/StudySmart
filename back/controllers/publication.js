const dotenv = require("dotenv");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createPublication(req, res, next) {
    try {
        const { userId } = req.auth;
        const profile = await prisma.profile.findFirst({
            where: {
                user_id: userId
            }
        });
        const { title, description, text } = req.body;
        const publication = await prisma.publication.create({
            data: {
                profile_id: profile.id,
                title: title,
                description: description,
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