const publicationDatabase = require("./../services/database/publicationDatabase");
const profileDatabase = require("./../services/database/profileDatabase");
const userDatabase = require("./../services/database/userDatabase");
const { Mail } = require("./../services/brevo/brevo");

async function createPublication(req, res, next) {
    try {
        const { userId } = req.auth;
        const profile = await profileDatabase.getOneProfile({
            where: {
                user_id: userId
            }
        });
        const { title, description, text, link } = req.body;
        const publication = await publicationDatabase.createPublication({
            data: {
                profile_id: profile.id,
                title: title,
                description: description,
                text: text,
                link: link
            },
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
        });
        try {
            sendMail(userId);
        } catch (error) {
            console.log(error);
        }
        res.status(200).json(publication);
    } catch (error) {
        res.status(500).json(error);
    }
}

async function getOnePublication(req, res, next) {
    try {
        const { id } = req.params;
        const publicationId = parseInt(id);
        const publication = await publicationDatabase.getOnePublication({
            where: {
                id: publicationId
            }
        });
        const profileId = publication.profile_id;
        const profile = await profileDatabase.getOneProfile({
            where: {
                id: parseInt(publication.profile_id)
            },
            include: {
                user: {
                    select: {
                        lastname: true,
                        firstname: true,
                        username: true,
                    }
                }
            }
        });
        const publicationWithProfile = {
            ...publication,
            ...profile
        };
        if (!publication) {
            res.status(404).json("Couldn't find the publication");
        } else {
            res.status(200).json(publicationWithProfile);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

async function getAllPublications(req, res, next) {
    try {
        const offset = req.query?.offset;
        const limit = req.query?.limit;
        const publications = await publicationDatabase.getAllPublications({
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
        const user = await userDatabase.getOneUser({
            where: {
                id: parseInt(userId)
            }
        });
        const profile = await profileDatabase.getOneProfile({
            where: {
                user_id: parseInt(user.id)
            }
        });
        const publication = await publicationDatabase.getOnePublication({
            where: {
                id: parseInt(id)
            }
        });
        if (publication.profile_id != profile.id) {
            res.status(403).json("User is not allowed to update post");
        } else {
            const updatedPublication = publicationDatabase.updatePublication({
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
        const user = userDatabase.getOneUser({
            where: {
                id: parseInt(userId)
            }
        });
        const profile = profileDatabase.getOneProfile({
            where: {
                user_id: parseInt(user.id)
            }
        });
        const publication = publicationDatabase.getOnePublication({
            where: {
                id: parseInt(id)
            }
        });
        if (!publication) {
            res.status(404).json("Couldn't find the publication");
        } else if (publication.profile_id != profile.id) {
            res.status(403).json("User is not allowed to delete post");
        } else {
            const deletePublication = publicationDatabase.deletePublication({
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

async function sendMail(userId) {
    const user = await userDatabase.getOneUser({
        where: {
            id: userId,
        },
    });
    if (user) {
        const { email, username } = user;
        Mail(email, username);
    } else {
        res.status(500).json(error);
    }
}

module.exports = { createPublication, getOnePublication, getAllPublications, updatePublication, deletePublication };