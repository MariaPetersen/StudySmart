const dotenv = require("dotenv");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createProfile(req, res, next) {
    try {
        const { userId } = req.auth;
        const { description } = req.body;
        if (await prisma.profile.findFirst({
            where: {
                user_id: userId
            }
        })) {
            res.status(404).json("User profile already exists");
        }
        const profile = await prisma.profile.create({
            data: {
                user_id: userId,
                description: description
            }
        });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { createProfile };