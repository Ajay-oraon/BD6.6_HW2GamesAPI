let movies = [
  {
    movieId: 1,
    title: "Inception",
    genre: "Sci-Fi",
    director: "Christopher Nolan",
  },
  {
    movieId: 2,
    title: "The Shawshank Redemption",
    genre: "Drama",
    director: "Frank Darabont",
  },
  {
    movieId: 3,
    title: "The Godfather",
    genre: "Crime",
    director: "Francis Ford Coppola",
  },
];

function getAllMovies() {
  return movies;
}

function getMoviesById(id) {
  let result = movies.find((obj) => obj.movieId === id);
  return result;
}

module.exports = { getAllMovies, getMoviesById };
