# GIT

![Alt text](image.png)

## Start un projet 

  - A partir de rien:
    ~~~bash
    $ git init
    ~~~
  
  - A partir d'un repot:
    ~~~bash
    $ git clone <Lien vers le repo>
    ~~~

## Git flow 

~~~bash 
$ git flow init
~~~

~~~bash 
Initialized empty Git repository in ~/project/.git/
No branches exist yet. Base branches must be created now.
Branch name for production releases: [master]
Branch name for "next release" development: [develop]

How to name your supporting branch prefixes?
Feature branches? [feature/]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]
Version tag prefix? []
~~~

## Les différentes branches 

### master 

Branche de production

### Develop 

Branche de développement

### Feature

Branche de fonctionnalité

---
#### Création d'une branche de fonctionnalité

~~~bash 
git flow feature start feature_branch
~~~
#### Publier une fonctionnalité
~~~bash 
git flow feature publish MYFEATURE
~~~

#### Terminer une branche de fonctionnalité
~~~bash 
git flow feature finish feature_branch
~~~

## Les commits 

~~~bash
<type>(<portée>): <sujet>

<description>

<footer>
~~~

- Type définit le type de commit
  - **build**: Système de build (example : gulp, webpack, npm)
  - **ci**: Intégration continue (example scopes: Travis, Circle, BrowserStack, SauceLabs)
  - **docs**: Documentation
  - **feat**: Ajout d'une fonctionnalité
  - **fix**: Correction de bogue
  - **perf**: Amélioration des performances
  - **refactor**: Changement du code qui ne change rien au fonctionnement
  - **style**: Changement du style du code (sans changer la logique)
  - **test**: Modification des tests

- Portée définit quelle partie de votre librairie / application est affectée par le commit (cette information est optionnelle)

- Sujet contient une description succinte des changements
En utilisant l'impératif présent ("change", et non pas "changed" ou "changes")
Sans majuscule au début
Pas de "." à la fin de la description

- Description permet de détailler plus en profondeur les motivations derrière le changement. Les règles sont les mêmes que pour la partie Sujet.

- Footer contient les changements importants (Breaking Changes) et les références à des issues GitHub / GitLab ou autre.

## Git pull

/ ! \ Avant de commencer une fonctionnalité pull l'ensemble du code 
~~~bash 
git pull
~~~

## Git push

/ ! \  Ne Jamais push directement sur develop, passer par un pull request via github
~~~bash 
git push <remote> <branch>
~~~~
