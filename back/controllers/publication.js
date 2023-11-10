const dotenv = require("dotenv");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createPublication(req, res, next) {
    try {
        console.log("here");
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

async function getOnePublication(req, res, next) {
    try {
        const { id } = req.params;
        const publicationId = parseInt(id);
        const publication = await prisma.publication.findFirst({
            where: {
                id: publicationId
            }
        });
        res.status(200).json(publication);
    } catch (error) {
        res.status(500).json(error);
    }
}

async function getAllPublications(req, res, next) {
    try {
        const offset = req.query?.offset;
        const limit = req.query?.limit;
        const publications = await prisma.publication.findMany({
            skip: offset ? parseInt(offset) : 0,
            take: limit ? parseInt(limit) : 100
        });
        res.status(200).json(publications);
    } catch {
        res.status(500).json(error);
    }
}

async function updatePublication(req, res, next) {
    try {
        // const offset = req.query?.offset;
        // const limit = req.query?.limit;
        const publications = await prisma.publication.findMany({
            skip: offset ? offset : null,
            take: limit ? limit : null
        });
        res.status(201).json(publications);
    } catch {
        res.status(500).json(error);
    }
}

module.exports = { createPublication, getOnePublication, getAllPublications, updatePublication };