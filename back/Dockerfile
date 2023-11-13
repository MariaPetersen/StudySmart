# Utiliser une image légère Node.js
FROM node:20-alpine 

# Définir une variable d'environnement NODE_ENV avec une valeur par défaut

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

# Définir le répertoire de travail dans le conteneur
WORKDIR /app/back

# Copier les fichiers nécessaires dans le conteneur
COPY package*.json ./

# Conditionnellement installer les dépendances
RUN if [ "$NODE_ENV" = "prod" ] ; then \
       npm install ; \
    else \
       npm install && npm install prisma --save-dev ; \
    fi

# Copier le reste des fichiers du backend
COPY . .


# Exposer le port sur lequel le serveur Express tourne
EXPOSE 3001

# Commande pour démarrer le serveur
CMD if [ "$NODE_ENV" = "prod" ] ; then \
   npm run start:prod; \
else \
   npm run start:dev; \
fi