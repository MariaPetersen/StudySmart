const dotenv = require("dotenv");
const profileDatabase = require("./../services/database/profileDatabase");
const prisma = require("./../prisma/prisma");

async function createProfile(req, res, next) {
    try {
        const { userId } = req.auth;
        const { description } = req.body;
        if (await profileDatabase.getOneProfile({
            where: {
                user_id: parseInt(userId)
            }
        })) {
            res.status(404).json("User profile already exists");
        } else {
            const profile = await profileDatabase.createProfile({
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
        const profile = await profileDatabase.getOneProfile({
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
                },
                profilePicture: {
                    select: {
                        remotePath: true
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
        const profile = await profileDatabase.getOneProfile({
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
            const deletedProfile = await profileDatabase.deleteProfile({
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
        const profile = await profileDatabase.getOneProfile({
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
            const updatedProfile = await profileDatabase.updateProfile({
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
                                firstname: req.body.firstname,
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