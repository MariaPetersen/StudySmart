const { PrismaClient } = require('@prisma/client');
const cloudinary = require('./../services/cloudinary/cloudinary');
const dotenv = require('dotenv');

const prisma = new PrismaClient();

async function uploadImage(req, res, next) {
    const file = req.files.image;
    const { userId } = req.auth;
    try {
        if (!file) {
            return res.status(400).json({ error: "No File Selected" });
        }

        const result = await cloudinary.uploader.upload(file.data, {
            public_id: `${Date.now()}`,
            resource_type: "auto",
            folder: "profileImages"
        });

        const profile = await prisma.profile.findFirst({
            where: {
                user_id: parseInt(userId)
            }
        });

        const profilePicture = await prisma.profilePictures.create({
            data: {
                profile_id: parseInt(profile.id),
                remotePath: result.secure_url,
                publicId: result.public_id
            }
        });

        return res.status(200).send(profilePicture);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function deleteImage(req, res, next) {
    const { userId } = req.auth;
    try {


        const profile = await prisma.profile.findFirst({
            where: {
                user_id: parseInt(userId)
            },
            include: {
                profilePicture: {
                    select: {
                        publicId: true
                    }
                }
            }
        });

        const result = await cloudinary.uploader.destroy(profile.profilePicture.publicId);

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = { uploadImage, deleteImage };