# SyncVote API


SyncVote API est un service backend qui permet de gérer des publications et des commentaires avec un système de votes. Il inclut des routes pour les utilisateurs, les publications, les commentaires, et les votes. L'API est construite avec TypeScript, utilise Express pour la gestion des routes et Firestore comme base de données.


## Fonctionnalités Principales

- Authentification et autorisation des utilisateurs
- Opérations CRUD pour les publications et les commentaires
- Votes (upvotes et downvotes) sur les publications et les commentaires
- Middleware pour la validation des données et l’authentification



## Installation 

Cloner le repertoire : git clone https://github.com/EragonRD/syncvote-api
Ouvrir le repertoire : cd syncvote-api
Installer les dépendances : npm install
Configurer l’environnement : Création dd'un fichier ".env" comme suit : 
FIREBASE_PROJECT_ID= <Votre ID Firebase>
FIREBASE_CLIENT_EMAIL= <Votre Email Client Firebase>
FIREBASE_PRIVATE_KEY= <Votre Clé Privée Firebase>
FIREBASE_DATABASE_URL= <URL de votre base Firestore>
 

