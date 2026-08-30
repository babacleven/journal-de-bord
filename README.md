<div align="center">

# Journal de Bord

_Un serveur Express qui note tout ce qui lui arrive - sans jamais s'arrêter de respirer._

![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-black?style=for-the-badge&logo=express&logoColor=white)
![Semaine 11](https://img.shields.io/badge/Semaine-11-f59e0b?style=for-the-badge)

</div>

---

## L'idée en une phrase

Plutôt que de polluer la console avec des `console.log`, chaque requête HTTP est **écrite sur disque de façon asynchrone** grâce aux promesses du module natif `node:fs/promises` : le serveur continue de répondre pendant que l'écriture se fait.

## Installation et démarrage (de zéro)

### Étape 1 - Installer Node.js

Si Node.js n'est pas encore installé sur ta machine :

1. Rends-toi sur **[nodejs.org](https://nodejs.org/fr)** et télécharge la version **LTS** (recommandée).
2. Lance l'installateur et suis les étapes (laisse les options par défaut).
3. Vérifie que tout est bien en place en ouvrant un terminal :

```bash
node -v    # affiche la version de Node.js (ex: v20.x.x)
npm -v     # affiche la version de npm (installé avec Node.js)
```

> Si les deux commandes renvoient un numéro de version, c'est bon. Sinon, redémarre ton terminal (ou ton PC) pour que le PATH se mette à jour.

### Étape 2 - Récupérer le projet

```bash
# Clone le dépôt puis place-toi dedans
git clone https://github.com/babacleven/journal-de-bord.git
cd journal-de-bord
```

_(Ou télécharge le ZIP depuis GitHub et extrais-le si tu n'utilises pas git.)_

### Étape 3 - Installer les dépendances

```bash
npm install
```

Cette commande crée le dossier `node_modules` avec Express, le seul paquet nécessaire au projet.

### Étape 4 - Allumer le serveur

```bash
npm start          # ou : npm run dev (redémarrage auto à chaque modification)
```

Le serveur répond sur `http://localhost:3000` - ouvre cette adresse dans ton navigateur, puis teste `/etat` et `/a-propos`.

Pour arrêter le serveur : `Ctrl + C` dans le terminal.


## Ce que contient le projet

```text
journal-de-bord/
├── src/
│   ├── app.js                # L'application Express et ses routes
│   └── middlewares/
│       └── journal.js        # Le cœur du projet : le traçage asynchrone
├── server.js                 # Point d'entrée : démarre l'application
├── journal.txt               # Généré automatiquement au fil des requêtes
├── package.json
└── README.md
```

## Comment ça marche, étape par étape

1. Une requête arrive → Express appelle d'abord notre middleware `tracerRequete`.
2. Le middleware note l'heure de départ et se branche sur l'événement `finish` de la réponse.
3. Il appelle `next()` immédiatement : la route peut répondre sans attendre.
4. Quand la réponse est partie, on construit la ligne de log (date, méthode, URL, statut, durée).
5. `appendFile()` écrit la ligne dans `journal.txt` via une promesse - si ça échoue, l'erreur est affichée mais **le serveur ne plante pas**.

## Les routes

| Route           | Ce qu'elle fait                                         |
| --------------- | ------------------------------------------------------- |
| `GET /`         | Message de bienvenue.                                   |
| `GET /etat`     | Sonde de vie - renvoie `{"etat": "operationnel"}`.      |
| `GET /a-propos` | Rappel du nom du projet et de son objectif pédagogique. |

## Exemple de journal produit

```text
[2026-08-21T10:12:45.312Z] GET / -> 200 (2 ms)
[2026-08-21T10:12:51.874Z] GET /etat -> 200 (1 ms)
[2026-08-21T10:13:07.004Z] GET /a-propos -> 200 (1 ms)
```

## Ce que cet exercice travaille

- **Créer un middleware Express** et le brancher avec `app.use()`
- **Programmation asynchrone non bloquante** : promesses + événement `finish`
- **Module `node:fs/promises`** avec `appendFile`
- **Gestion des chemins** portable avec `node:path`
- **Robustesse** : une erreur d'écriture ne casse jamais le serveur

## Contexte : issu d'une formation vidéo

Ce projet est né d'une **formation vidéo Node.js**. Il met en pratique les notions abordées au fil des chapitres :

| Chapitre de la formation              | Utilisé ici ?        | Où le voir                                                                      |
| ------------------------------------- | -------------------- | ------------------------------------------------------------------------------- |
| Installation et environnement Node.js | Oui                  | Prérequis pour lancer le projet                                                 |
| `package.json` et scripts NPM         | Oui                  | Scripts `start` et `dev`                                                        |
| Modules CommonJS vs modules ES        | Oui                  | Syntaxe `import` / `export` (ESM) partout                                       |
| Serveur HTTP natif (`node:http`)      | Remplacé             | Express fait le même travail dans `src/app.js`                                  |
| Variables d'environnement             | Oui                  | `process.env.PORT` dans `server.js` (port personnalisable sans toucher au code) |
| Routage simple                        | Oui                  | Routes `/`, `/etat`, `/a-propos`                                                |
| Construction d'une API JSON           | Oui                  | Réponses envoyées avec `res.json()`                                             |
| Middleware                            | Oui - cœur du projet | `src/middlewares/journal.js` branché via `app.use()`                            |
| Module `fs` (système de fichiers)     | Oui                  | `appendFile` via `node:fs/promises`                                             |
| Module `path`                         | Oui                  | Construction du chemin de `journal.txt`                                         |
| Événements (EventEmitter)             | Oui                  | `res.on("finish", ...)` : la réponse est un émetteur d'événements               |
| Objet `process`                       | Oui                  | `process.cwd()`, `process.env`, `process.exit()` implicite à l'arrêt            |
| Modules `os`, `url`, `crypto`         | Non utilisés ici     | Hors scope de cet exercice                                                      |

## Auteur

**BABA Aristote**
[GitHub @babacleven](https://github.com/babacleven)

_Projet réalisé dans le cadre de la Semaine 11 - Akieni Academy._


