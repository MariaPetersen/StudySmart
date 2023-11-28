const prisma = require('../../prisma/prisma');

async function getOneUser(query) {
    return prisma.user.findUnique(query);
}

async function createUser(query) {
    return prisma.user.create(query);
}

module.exports = { getOneUser, createUser };