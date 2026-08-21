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

## Démarrage rapide

```bash
# 1. Récupérer les dépendances
npm install

# 2. Allumer le serveur
npm start          # ou : npm run dev (redémarrage auto à chaque modification)
```

Le serveur répond sur `http://localhost:3000`.

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

## Auteur

**BABA Aristote**
[GitHub @babacleven](https://github.com/babacleven)

_Projet réalisé dans le cadre de la Semaine 11 - Akieni Academy._
