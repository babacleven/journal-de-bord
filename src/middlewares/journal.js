import { appendFile } from "node:fs/promises"; // Écriture non bloquante dans un fichier
import path from "node:path"; // Pour construire un chemin valide sur tous les OS

// Le fichier journal sera créé à la racine du projet, sous le nom "journal.txt"
const fichierJournal = path.join(process.cwd(), "journal.txt");

/**
 * Middleware de traçage : à chaque requête HTTP reçue,
 * on enregistre une ligne dans journal.txt SANS bloquer la réponse.
 *
 * Astuce : on attend l'événement "finish" de la réponse pour
 * connaître aussi le code de statut renvoyé et le temps de traitement.
 */
export function tracerRequete(req, res, suite) {
  const debut = Date.now(); // Moment où la requête arrive

  // "finish" se déclenche quand la réponse a été envoyée au client
  res.on("finish", () => {
    const duree = Date.now() - debut;
    const horodatage = new Date().toISOString();
    const ligne = `[${horodatage}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duree} ms)\n`;

    // appendFile retourne une promesse : l'écriture est asynchrone,
    // le serveur reste réactif pendant qu'elle s'effectue
    appendFile(fichierJournal, ligne, "utf8").catch((erreur) => {
      console.error("Échec de l'écriture dans le journal :", erreur.message);
    });
  });

  // On passe la main au middleware ou à la route suivante
  suite();
}
