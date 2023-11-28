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
        } else {
            res.status(200).json(publication);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

async function getAllPublications(req, res, next) {
    try {
        const offset = req.query?.offset;
        const limit = req.query?.limit;
        console.log("here");
        const publications = await prisma.publication.findMany({
            skip: offset ? parseInt(offset) : 0,
            take: limit ? parseInt(limit) : 100,
            include: {
                profile: {
                    include: {
                        user: {
                            select: {
                                lastname: true,
                                firstname: true,
                                username: true
                            }
                        }
                    }
                }
            }
        }
        );
        res.status(200).json(publications);
    } catch (error) {
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
        } else {
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
        }
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
        } else if (publication.profile_id != profile.id) {
            res.status(403).json("User is not allowed to delete post");
        } else {
            const deletePublication = await prisma.publication.delete({
                where: {
                    id: parseInt(id)
                },
            });
            res.status(200).json(deletePublication);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { createPublication, getOnePublication, getAllPublications, updatePublication, deletePublication };