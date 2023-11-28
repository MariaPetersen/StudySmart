const prisma = require('../../prisma/prisma');

async function getOneProfile(query) {
    return prisma.profile.findFirst(query);
}

async function createProfile(query) {
    return prisma.profile.create(query);
}

async function deleteProfile(query) {
    return prisma.profile.delete(query);
}

async function updateProfile(query) {
    return prisma.profile.update(query);
}
module.exports = { getOneProfile, createProfile, deleteProfile, updateProfile };