const dotenv = require("dotenv");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createProfile(req, res, next) {
    try {
        const { userId } = req.auth;
        const { description } = req.body;
        if (await prisma.profile.findFirst({
            where: {
                user_id: parseInt(userId)
            }
        })) {
            res.status(404).json("User profile already exists");
        } else {
            const profile = await prisma.profile.create({
                data: {
                    user_id: parseInt(userId),
                    description: description
                }
            });
            res.status(200).json(profile);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

async function getOneProfile(req, res, next) {
    try {
        const { id } = req.params;
        const { userId } = req.auth;
        const profile = await prisma.profile.findFirst({
            where: {
                user_id: parseInt(userId)
            },
            include: {
                user: {
                    select: {
                        lastname: true,
                        firstname: true,
                        username: true,
                        email: true
                    }
                }
            }
        });
        if (!profile) {
            res.status(404).json("Couldn't find the profile");
        } else if (profile.id != id) {
            res.status(403).json("User is not allowed to display profile");
        } else {
            res.status(200).json(profile);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

async function deleteProfile(req, res, next) {
    try {
        const { id } = req.params;
        const { userId } = req.auth;
        const profile = await prisma.profile.findFirst({
            where: {
                user_id: parseInt(userId)
            }
        });
        if (!profile) {
            res.status(404).json("Couldn't find the profile");
        }
        else if (profile.id != id) {
            res.status(403).json("User is not allowed to delete profile");
        } else {
            const deletedProfile = await prisma.profile.delete({
                where: {
                    id: profile.id
                }
            });
            res.status(200).json(deletedProfile);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

async function updateProfile(req, res, next) {
    try {
        const { id } = req.params;
        const { userId } = req.auth;
        const profile = await prisma.profile.findFirst({
            where: {
                user_id: parseInt(userId)
            }
        });
        if (!profile) {
            res.status(404).json("Couldn't find the profile");
        }
        else if (profile.id != id) {
            res.status(403).json("User is not allowed to update profile");
        } else {
            const updatedProfile = await prisma.profile.update({
                where: {
                    id: parseInt(profile.id)
                },
                data: {
                    description: req.body.description,
                    user: {
                        update: {
                            where: {
                                id: parseInt(userId)
                            },
                            data: {
                                lastname: req.body.lastname,
                                firstname: req.body.firstnamename,
                                email: req.body.email,
                                username: req.body.username
                            }
                        }
                    }
                },
                include: {
                    user: {
                        select: {
                            lastname: true,
                            firstname: true,
                            username: true,
                            email: true
                        }
                    }
                }
            });
            res.status(200).json(updatedProfile);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { createProfile, getOneProfile, deleteProfile, updateProfile };