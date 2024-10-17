const express = require("express");
const { getAllGames, getGamesById } = require("./controllers");
const app = express();
app.use(express.json());

app.get("/games", (req, res) => {
  let games = getAllGames();
  res.json({ games });
});

app.get("/games/details/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let game = getGamesById(id);
  res.json({ game });
});

module.exports = { app };
