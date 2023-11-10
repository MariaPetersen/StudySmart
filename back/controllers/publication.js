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
        if (!publication) {
            res.status(404).json("Couldn't find the publication");
        }
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
        const { userId } = req.auth;
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        });
        const profile = await prisma.profile.findFirst({
            where: {
                user_id: parseInt(user.id)
            }
        });
        const publication = await prisma.publication.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (publication.profile_id != profile.id) {
            res.status(403).json("User is not allowed to update post");
        }
        console.log("here");
        const updatedPublication = await prisma.publication.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title: req.body.title,
                description: req.body.description,
                text: req.body.text,
                link: "http"
            }
        });
        res.status(200).json(updatedPublication);
    } catch (error) {
        res.status(500).json(error);
    }
}

async function deletePublication(req, res, next) {
    try {
        const { userId } = req.auth;
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        });
        const profile = await prisma.profile.findFirst({
            where: {
                user_id: parseInt(user.id)
            }
        });
        const publication = await prisma.publication.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!publication) {
            res.status(404).json("Couldn't find the publication");
        }
        if (publication.profile_id != profile.id) {
            res.status(403).json("User is not allowed to delete post");
        }
        const deletePublication = await prisma.publication.delete({
            where: {
                id: parseInt(id)
            },
        });
        res.status(200).json(deletePublication);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { createPublication, getOnePublication, getAllPublications, updatePublication, deletePublication };