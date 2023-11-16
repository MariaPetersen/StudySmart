# Utiliser une image légère Node.js
FROM node:20-alpine AS dev
# Définir une variable d'environnement NODE_ENV avec une valeur par défaut
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
# Définir le répertoire de travail dans le conteneur
WORKDIR /app/back
# Copier les fichiers nécessaires dans le conteneur
COPY package*.json ./
# Conditionnellement installer les dépendances
RUN npm install && npm install prisma --save-dev 
# Copier le reste des fichiers du backend
COPY . .
# Exposer le port sur lequel le serveur Express tourne
EXPOSE 3001
# Commande pour démarrer le serveur
CMD npm run start:dev
# Utiliser une image légère Node.js

FROM node:20-alpine AS prod
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
WORKDIR /app/back
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD npm run start:prod