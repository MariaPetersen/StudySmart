const prisma = require('../../prisma/prisma');

async function getOneProfile(query) {
    await prisma.profile.findFirst(query);
}

async function createProfile(query) {
    await prisma.profile.create(query);
}

async function deleteProfile(query) {
    await prisma.profile.delete(query);
}

async function updateProfile(query) {
    await prisma.profile.update(query);
}
module.exports = { getOneProfile, createProfile, deleteProfile, updateProfile };