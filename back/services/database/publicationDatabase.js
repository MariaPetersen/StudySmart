const prisma = require('../../prisma/prisma');

async function createPublication(query) {
    return prisma.publication.create(query);
}

async function getOnePublication(query) {
    return prisma.publication.findFirst(query);
}

async function getAllPublications(query) {
    return prisma.publication.findMany(query);
}

async function updatePublication(query) {
    return prisma.publication.update(query);
}

async function deletePublication(query) {
    return prisma.publication.delete(query);
}

module.exports = { createPublication, getOnePublication, getAllPublications, updatePublication, deletePublication };