# SyncVote API


SyncVote API est un service backend qui permet de gérer des publications et des commentaires avec un système de votes. Il inclut des routes pour les utilisateurs, les publications, les commentaires, et les votes. L'API est construite avec TypeScript, utilise Express pour la gestion des routes et Firestore comme base de données.


## Fonctionnalités Principales

- Authentification et autorisation des utilisateurs
- Opérations CRUD pour les publications et les commentaires
- Votes (upvotes et downvotes) sur les publications et les commentaires
- Middleware pour la validation des données et l’authentification



## Installation 

Cloner le repertoire :
```plaintext
git clone https://github.com/EragonRD/syncvote-api
```

Ouvrir le repertoire : cd syncvote-api

Installer les dépendances : 

```plaintext 
npm install
```

Configurer l’environnement : Création dd'un fichier ".env" comme suit : 

```plaintext
FIREBASE_PROJECT_ID= <Your Firebase Project ID>
FIREBASE_CLIENT_EMAIL= <Your Firebase Client Email>
FIREBASE_PRIVATE_KEY= <Your Firebase Private Key>
FIREBASE_DATABASE_URL= <Your Firestore Database URL>
```

