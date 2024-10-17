const { getAllMovies } = require("../controllers");

const { app } = require("../index");
const request = require("supertest");
const http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllMovies: jest.fn(),
}));

describe("Controller Function test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should return all movies", async () => {
    let mockMovies = [
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

    getAllMovies.mockReturnValue(mockMovies);
    let result = getAllMovies();
    expect(result).toEqual(mockMovies);
    expect(result.length).toBe(3);
  });
});

describe("API endpoints test", () => {
  it("Get /movies should get all movies", async () => {
    let res = await request(server).get("/movies");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      movies: [
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
      ],
    });
  });

  //get movies by id
  it("Get /movies/details/:id should get specific movies for id", async () => {
    let res = await request(server).get("/movies/details/1");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      movie: {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
    });
  });
});
