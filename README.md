# SyncVote API $${\color{cyan}Debbah \space\ Rabah}$$

SyncVote API est un service backend qui permet de gérer des publications et des commentaires avec un système de votes. Il inclut des routes pour les utilisateurs, les publications, les commentaires, et les votes. L'API est construite avec TypeScript, utilise Express pour la gestion des routes et Firestore comme base de données.

## Table des matières

- [Fonctionnalités Principales](#fonctionnalités-principales)
- [Installation](#installation)
- [Configuration](#configuration)
- [Postman](#postman)
- [Utilisation](#utilisation)
- [Documentation de l'API SyncVote](#documentation-de-lapi-syncvote)

---

## Fonctionnalités Principales

- Authentification et autorisation des utilisateurs
- Opérations CRUD pour les publications et les commentaires
- Votes (upvotes et downvotes) sur les publications et les commentaires
- Middleware pour la validation des données et l'authentification

---

## Installation 

1. **Cloner le répertoire :**
   ```bash
   git clone https://github.com/EragonRD/syncvote-api
   cd syncvote-api
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Configurer l'environnement :**

   Créer un fichier `.env` à la racine du projet avec les variables suivantes :
   ```plaintext
   FIREBASE_PROJECT_ID= <Votre Firebase Project ID>
   FIREBASE_CLIENT_EMAIL= <Votre Firebase Client Email>
   FIREBASE_PRIVATE_KEY= <Votre Firebase Private Key>
   FIREBASE_DATABASE_URL= <Votre Firestore Database URL>
   ```

---

## Configuration

   ### Firebase et Firestore
   Assurez-vous que Firebase et Firestore sont correctement configurés. Le fichier `.env` doit contenir les identifiants nécessaires pour se connecter à Firebase Firestore.

   ### Redis
   Redis est utilisé comme système de mise en cache pour améliorer les performances de l'API. Par défaut, le client Redis se connecte à :
   - Host : 127.0.0.1
   - Port : 6379

   Pour installer Redis :

   **Sur Linux :**
   ```bash
   sudo apt-get install redis-server
   ```

   **Sur macOS :**
   ```bash
   brew install redis
   ```

   
**Sur Windows :**
Pour installer Redis sur Windows, il est recommandé d'utiliser le sous-système Windows pour Linux (WSL) avec une image Ubuntu. Voici les étapes à suivre :

Pour démarrer le serveur Redis :
```bash
wsl --install
```
Redémarrez votre ordinateur si nécessaire.
Installez Ubuntu depuis le Microsoft Store.

Configurer Ubuntu :

Lancez Ubuntu depuis le menu Démarrer.
Suivez les instructions pour configurer votre utilisateur et mot de passe.

Installer Redis sur Ubuntu :

```bash
sudo apt update
sudo apt install redis-server
```

Puis démarrer le serveur : 

```bash
sudo service redis-server start
redis-cli ping
```


## Postman

Pour faciliter les tests de l'API SyncVote, une collection Postman est fournie. Cette collection contient des requêtes prédéfinies pour l'authentification, la gestion des utilisateurs, les opérations sur les publications et les commentaires, ainsi que les actions de vote.


---

## Utilisation

1. **Démarrer le serveur :**
   ```bash
   npm run dev
   ```

2. **Exécuter les requêtes Postman :**
   - Développez la collection syncvote importée dans Postman
   - Chaque requête est préconfigurée avec la méthode, les en-têtes et les paramètres nécessaires
   - Pour tester les endpoints (connexion, inscription, création de post, etc.), cliquez sur une requête puis sur "Send"

---

# Documentation de l'API SyncVote

Cette API permet de gérer les utilisateurs, les publications, les commentaires et les votes. Chaque endpoint est décrit avec ses méthodes, en-têtes, paramètres d'URL et exemples de requêtes.

## Authentication

### 1. Login as Admin
- **Method**: `POST`
- **URL**: `/auth/login`
- **Body**:
  ```json
  {
	"email": "admin@gmail.com",
	"password": "adminPassword"
  }
  ```

### 2. Login as User
- **Method**: `POST`
- **URL**: `/auth/login`
- **Body**:
  ```json
  {
	"email": "user@gmail.com",
	"password": "userPassword"
  }
  ```

---

## Gestion des Utilisateurs

### 1. Créer un Utilisateur
- **Méthode** : `POST`
- **URL** : `/users`
- **Corps** :
  ```json
  {
	"email": "user@gmail.com",
	"password": "userPassword",
	"username": "username"
  }
  ```

### 2. Obtenir tous les Utilisateurs
- **Méthode** : `GET`
- **URL** : `/users`
- **En-têtes** :
	- `Authorization: Bearer {{bearer_token}}`

### 3. Obtenir un Utilisateur par ID
- **Méthode** : `GET`
- **URL** : `/users/:id`
- **En-têtes** :
	- `Authorization: Bearer {{bearer_token}}`

### 4. Modifier un Utilisateur par ID
- **Méthode** : `PUT`
- **URL** : `/users/:id`
- **En-têtes** :
	- `Authorization: Bearer {{bearer_token}}`
- **Corps** :
  ```json
  {
	"email": "usermodifier@gmail.com",
	"username": "usernamemodifier"
  }
  ```

### 5. Modifier l'Utilisateur Connecté
- **Méthode** : `PUT`
- **URL** : `/users/me`
- **En-têtes** :
	- `Authorization: Bearer {{bearer_token}}`
- **Corps** :
  ```json
  {
	"email": "usermodifier@gmail.com",
	"username": "usernamemodifier"
  }
  ```

### 6. Supprimer un Utilisateur par ID
- **Méthode** : `DELETE`
- **URL** : `/users/:id`
- **En-têtes** :
	- `Authorization: Bearer {{bearer_token}}`

### 7. Changer le Mot de Passe
- **Méthode** : `PATCH`
- **URL** : `/users/password`
- **Corps** :
  ```json
  {
	"oldPassword": "oldPassword",
	"newPassword": "newPassword"
  }
  ```

---

## Gestion des Publications

### 1. Créer une Publication
- **Méthode** : `POST`
- **URL** : `/posts`
- **En-têtes** :
	- `Authorization: Bearer {{bearer_token}}`
- **Corps** :
  ```json
  {
	"title": "Titre du post",
	"description": "description du post",
	"categories": ["category"]
  }
  ```

### 2. Obtenir toutes les Publications
- **Méthode** : `GET`
- **URL** : `/posts`
- **En-têtes** :
	- `Authorization: Bearer {{bearer_token}}`

### 3. Obtenir une Publication par ID
- **Méthode** : `GET`
- **URL** : `/posts/:id`
- **En-têtes** :
	- `Authorization: Bearer {{bearer_token}}`

### 4. Obtenir toutes les Publications d'un Utilisateur
- **Méthode** : `GET`
- **URL** : `/users/:userId/posts`

### 5. Obtenir les Publications par Catégorie
- **Méthode** : `GET`
- **URL** : `/posts?category=sports`
- **En-têtes** :
	- `Authorization: Bearer {{bearer_token}}`

### 6. Modifier une Publication par ID
- **Méthode** : `PUT`
- **URL** : `/posts/:id`
- **En-têtes** :
	- `Authorization: Bearer {{bearer_token}}`
- **Corps** :
  ```json
  {
	"title": "Titre du post modifier",
	"description": "description du post modifier",
	"categories": ["category modifier"]
  }
  ```

### 7. Supprimer une Publication par ID
- **Méthode** : `DELETE`
- **URL** : `/posts/:id`
- **En-têtes** :
	- `Authorization: Bearer {{bearer_token}}`

---

## Gestion des Commentaires

### 1. Ajouter un Commentaire à une Publication
- **Méthode** : `POST`
- **URL** : `/posts/:postId/comments`
- **En-têtes** :
	- `Authorization: Bearer {{bearer_token}}`
- **Corps** :
  ```json
  {
	"description": "description du commentaire"
  }
  ```

### 2. Obtenir tous les Commentaires d'une Publication
- **Méthode** : `GET`
- **URL** : `/posts/:postId/comments`
- **En-têtes** :
	- `Authorization: Bearer {{bearer_token}}`

### 3. Obtenir un Commentaire par ID
- **Méthode** : `GET`
- **URL** : `/comments/:id`
- **En-têtes** :
	- `Authorization: Bearer {{bearer_token}}`

### 4. Modifier un Commentaire par ID
- **Méthode** : `PUT`
- **URL** : `/comments/:id`
- **En-têtes** :
	- `Authorization: Bearer {{bearer_token}}`
- **Corps** :
  ```json
  {
	"description": "description du commentaire modifier"
  }
  ```

### 5. Supprimer un Commentaire par ID
- **Méthode** : `DELETE`
- **URL** : `/comments/:id`
- **En-têtes** :
	- `Authorization: Bearer {{bearer_token}}`

### 6. Obtenir tous les Commentaires
- **Méthode** : `GET`
- **URL** : `/comments/`

---

## Système de Votes

### 1. Voter sur une Publication
- **Méthode** : `POST`
- **URL** : `/votes/post`
- **Corps** :
  ```json
  {
	"entityId": "POST_ID",
	"type": "up || down"
  }
  ```

### 2. Voter sur un Commentaire
- **Méthode** : `POST`
- **URL** : `/votes/comment`
- **Corps** :
  ```json
  {
	"entityId": "COMMENT_ID",
	"type": "up || down"
  }
  ```

---

Chaque requête doit être testée avec vos propres valeurs.

Assurez-vous que l'en-tête `Authorization` est rempli avec `{{bearer_token}}` pour les requêtes nécessitant une authentification.
