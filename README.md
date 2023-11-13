# StudiSmart

1.0.0 

## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
   1. [Installation de Docker](#installation-de-docker)
      - [Linux](#linux)
      - [Windows](#windows)
      - [MAC](#mac)
   2. [Installation de StudySmart](#installation-de-studysmart)
4. [Initialisation](#initialisation-studysmart)
5. [Réinitialisation](#réinitialisation-studysmart)
6. [Collaboration](#collaboration)
7. [FAQs](#faqs)

## General Info

StudiSmart est un projet axé sur la veille et le partage de connaissances, offrant une plateforme complète pour approfondir ses compétences dans le développement web.

## Technologies

### Backend (Serveur et Logique Métier)

1. **Express.js**
   - [Documentation](https://expressjs.com/)
   - Version utilisée : `^4.18.2`

2. **Prisma**
   - [Documentation](https://www.prisma.io/)
   - Version utilisée : `^5.5.2`

3. **MySQL**
   - [Site Web](https://www.mysql.com/)
   - Version utilisée : `^2.18.1`

### Authentification et Sécurité

1. **Bcrypt**
   - [GitHub](https://github.com/kelektiv/node.bcrypt.js)
   - Version utilisée : `^5.1.1`

2. **Jsonwebtoken**
   - [GitHub](https://github.com/auth0/node-jsonwebtoken)
   - Version utilisée : `^9.0.2`

### Frontend (Interface Utilisateur)

1. **React**
   - [Documentation](https://reactjs.org/)
   - Version utilisée : `^18.2.0`

2. **React Router**
   - [Documentation](https://reactrouter.com/)
   - Version utilisée : `^6.18.0`

### Base de Données

1. **MySQL**
   - [Site Web](https://www.mysql.com/)
   - Version utilisée : `^2.18.1`

2. **Prisma**
   - [Documentation](https://www.prisma.io/)
   - Version utilisée : `^5.5.2`

### Outils de Développement

1. **Visual Studio Code (VSCode)**
   - [Site Web](https://code.visualstudio.com/)
   - Version utilisée : Non spécifiée

2. **Docker**
   - [Site Web](https://www.docker.com/)
   - Version utilisée : Non spécifiée

### Tests

1. **Jest**
   - [Documentation](https://jestjs.io/)
   - Version utilisée : Non spécifiée

## Installation

### Installation de Docker

#### Linux
  [Installation sur Linux](https://docs.docker.com/desktop/install/linux-install/
)


#### Windows

[Installation sur windows](https://docs.docker.com/desktop/install/windows-install/)


#### MAC

[Installation sur windows](https://docs.docker.com/desktop/install/mac-install/)

### Installation de StudySmart

- Cloner le repository GitHub
  - Avec SSH
    ```bash
    git clone git@github.com:MariaPetersen/StudySmart.git
    ```
  - Avec HTTPS
    ```bash
    git clone https://github.com/MariaPetersen/StudySmart.git
    ```

#### Pour le développement

- Créer un fichier `.env` à la racine du projet

~~~
StudySmart/
│
├── back/
│ ├── ...
├── Front/
│ ├── ...
├── .env
├── ...
~~~

- Remplir le fichier `.env` avec les valeurs suivantes

 ~~~bash
  # pour la production NODE_ENV=prod, pour le developpement NODE_ENV=dev
  NODE_ENV="dev"

  # Front
  FRONT_PORT=3000

  #Back
  BACK_PORT=3001

  #MySQL
  MYSQL_PORT=3306

  MYSQL_ROOT_USER = "root"
  MYSQL_ROOT_PASSWORD = "root"
  MYSQL_USER="user"
  MYSQL_PASSWORD="user"
  MYSQL_DATABASE="db"

  #PHPMyAdmin
  PHPMYADMIN_PORT=8080

  #Prisma 
  #mysql://root:root@db:3306/db
  ~~~

- Dans le fichier schema.prisma, modifier l'URL

~~~
StudySmart/
│
├── back/
│   ├── prisma/
│   │   ├── schema.prisma
├── Front/
│   ├── ...
├── .env
├── ...
~~~
~~~
url = "mysql://root:root@db:3306/db"~
~~~ 

#### Pour la production

- Créer un fichier .env à la racine du projet

~~~
StudySmart/
│
├── back/
│   ├── ...
├── Front/
│   ├── ...
├── .env
├── ...
~~~

- Remplir le fichier .env avec les valeurs de prod
- Dans le fichier schema.prisma, modifier l'URL

~~~
StudySmart/
│
├── back/
│   ├── prisma/
│   │   ├── schema.prisma
├── Front/
│   ├── ...
├── .env
├── ...
~~~
~~~
url = "mysql://USER:PASSWORD@HOST:PORT/DATABASE"
~~~

## Initialisation de StudySmart
Dans le terminal:
~~~
make startall
~~~

Cette commande permet de lancer le projet dans l’environnement de travail configuré dans le fichier .env. Elle exécute le fichier docker-compose.


## Réinitialisation de StudySmart
Dans le terminal:
~~~
make reset
~~~

Cette commande permet de supprimer toutes les données associées aux volumes et images Docker liées à votre application.

## Collaboration


## FAQs