import app from "./src/app.js"; // L'application Express (routes + middleware)

const PORT = process.env.PORT ?? 3000; // Le port peut être surchargé via la variable d'environnement PORT

app.listen(PORT, () => {
  console.log(`Journal de bord a l'ecoute sur http://localhost:${PORT}`);
});
