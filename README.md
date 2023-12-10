# Architecture technique

- [Architecture technique](#architecture-technique)
  - [Description](#description)
  - [Contributeurs](#contributeurs)
  - [Fonctionnalités](#fonctionnalités)
  - [Stack](#stack)
  - [Tools](#tools)
    - [Sécurité](#sécurité)
  - [Bonnes pratiques](#bonnes-pratiques)
    - [Design Patterns](#design-patterns)
  - [Prérequis](#prérequis)
  - [Installation](#installation)
  - [Lancer les tests](#lancer-les-tests)
  - [Déploiement](#déploiement)
  - [Contribuer](#contribuer)
  - [Documentation](#documentation)
  - [Licence](#licence)

## Description

Ce projet StudySmart est une application web conçue pour permettre aux étudiants en développement web de partager des sources éducatives intéressantes. Elle utilise ReactJs et NodeJs (Express) et suit les meilleures pratiques de développement front-end et back-end.

## Contributeurs

- Maria Petersen, développeuse full stack, https://github.com/MariaPetersen
- Kylian Rekik, développeur back end, https://github.com/DreaDrea8
- Joachim Renevier, développeur back end, https://github.com/micha-jo
- Alexandre Vital, développeur front end, https://github.com/alexvtl
- Lucas Yalman, développeur front end/UX designer, https://github.com/Lucas-ylm
- Williams Wandji, développeur front end, https://github.com/Wizuha

## Fonctionnalités

- Fonctionnalité 1 : Création d'un compte afin de publier des ressources.
- Fonctionnalité 2 : Visualisation des publications d'autres utilisateurs.
- Fonctionnalité 3 : Personalisation du profil avec enregistrement d'une photo de profil.
- Fonctionnalité 4 : Envoi d'un mail pour confirmer le publication de votre article.

## Stack

- **Backend** : [Nodejs](https://nodejs.org/) + [Express](https://expressjs.com/fr/)
- **Frontend** : [React](https://reactjs.org/)
- **BDD** : [MySQL](https://www.mysql.com/fr/) + [Prisma](https://www.prisma.io/)
- **Architecture** : Fonctionnement microservice

## Tools

- **Tests** : [Jest](https://jestjs.io/)
- **CI/CD** : [GitHub Actions](https://github.com/features/actions)
- **Documentation** : [Swagger](https://swagger.io/)
- **Hosting** : [Railway](https://railway.app/)
- **Commits** : [Commitizen](<[https://](https://github.com/commitizen/cz-cli)>)
- **Git** : [git flow](https://danielkummer.github.io/git-flow-cheatsheet/index.fr_FR.html)
- **Diagram** : [dbdiagram](https://dbdiagram.io/)

## Services externes

- **API envoi de mails**: [Brevo](https://www.brevo.com/fr/)
- **API stockage photos**: [Cloudinary](https://cloudinary.com/)
- **API link preview**: [Link preview](https://www.linkpreview.net/)

### Sécurité

- [jwt](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

## Bonnes pratiques

- TDD
- KISS
- DRY

### Design Patterns

- MVC

## Prérequis

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [docker](https://www.docker.com/)

## Installation

- 1. Cloner le projet :

  ```bash
  git clone [URL du dépôt]
  ```

- 2. Installer les dépendances :

```bash
npm install
```

- 3. [Autres étapes spécifiques au projet]

- 4. Lancer le projet :

Dans le dossier front

```bash
npm run dev
```

Dans le dossier back

```bash
npm run start
```

## Lancer les tests

```bash
npm test
```

## Déploiement

Nous avons mis en place un déploiement continu. Après contribution, une pull request est mergée sur la branche develop. Une fois testée et un review effectué, la branche develop est mergée sur la branche master et le déploiement se fait automatiquement.

## Contribuer

- Forker le projet
- Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
- Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
- Push sur la branche (`git push origin feature/AmazingFeature`)
- Ouvrir une Pull Request

## Documentation

Vous trouverez la documentation complète dans le dossier `docs` à la racine du projet.
Cahier de charge : ` docs/docs/cahier-des-charges-techniques.md``
Diagramme de la base de données :  `docs/database.png`Documentation de l'api :`docs/api.json`(l'extension Swagger Viewer dans VSCODE permet de visualiser la documenation en appuyant sur ALT + SHIFT + P)
Schéma de l'architecture :`docs/Architecture-StudySmart.png`

## Licence

Ce projet est sous licence MIT
