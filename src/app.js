import express from "express"; // Framework web minimaliste
import { tracerRequete } from "./middlewares/journal.js"; // Notre traçeur de requêtes

const app = express();

// Le middleware est branché en premier : il voit TOUTES les requêtes
app.use(tracerRequete);

// Accueil : simple message de bienvenue
app.get("/", (_req, res) => {
  res.json({
    message: "Bienvenue sur le Journal de Bord, chaque visite est tracée dans journal.txt",
  });
});

// Sonde de vie : permet de vérifier que le serveur tourne
app.get("/etat", (_req, res) => {
  res.status(200).json({ etat: "operationnel" });
});

// À propos : rappel du but pédagogique du projet
app.get("/a-propos", (_req, res) => {
  res.json({
    nom: "Journal de Bord",
    objectif: "Tracer chaque requête HTTP (date, méthode, URL, statut, durée) dans un fichier via fs/promises",
    semaine: "Semaine 11 - Akieni Academy",
  });
});

export default app;
