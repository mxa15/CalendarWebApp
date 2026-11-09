import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON-Daten empfangen
app.use(express.json());

// Vite-Build ausliefern
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static("public"));

// Hier kommen deine API-Routen hin
// Beispiel:
// app.get("/api/test", (req, res) => {
//     res.json({ message: "Hallo!" });
// });

// Alle übrigen Seiten an Vite weiterleiten (SPA)
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Server starten
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
