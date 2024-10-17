const express = require("express");
const { getAllMovies, getMoviesById } = require("./controllers");
const app = express();
app.use(express.json());

app.get("/movies", (req, res) => {
  let movies = getAllMovies();
  res.json({ movies });
});

app.get("/movies/details/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let movie = getMoviesById(id);
  res.json({ movie });
});

module.exports = { app };
