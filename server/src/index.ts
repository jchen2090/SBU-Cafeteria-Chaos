import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scoresJsonPath = path.join(__dirname, "scores.json");

app.use(express.json());
app.use(express.static("public"));

app.get("/api/scores", (_, res) => {
  fs.readFile(scoresJsonPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(503).send("Unable to access scores data");
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
});

app.post("/api/scores", (req, res) => {
  const { highScores, gamesPlayed } = req.body;

  fs.readFile(scoresJsonPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading data when writing");
      res.status(503).send("Unable to access scores data");
    } else {
      const existingData = JSON.parse(data);
      existingData.highScores = highScores;
      existingData.gamesPlayed = gamesPlayed;

      fs.writeFile(
        scoresJsonPath,
        JSON.stringify(existingData),
        "utf-8",
        (err) => {
          if (err) {
            console.error(err);
          }
          res.status(200).send("Wrote to file successfully");
        },
      );
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
