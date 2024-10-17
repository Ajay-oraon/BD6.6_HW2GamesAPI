const { app } = require("../index");
const { getAllGames } = require("../controllers");
const request = require("supertest");
const http = require("http");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllGames: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Controllers Function test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all games", () => {
    let mockGames = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];
    getAllGames.mockReturnValue(mockGames);
    let result = getAllGames();
    expect(result).toEqual(mockGames);
    expect(result.length).toBe(3);
  });
});

describe("API endpoints test", () => {
  it("Get /games should get all games", async () => {
    let res = await request(server).get("/games");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      games: [
        {
          gameId: 1,
          title: "The Legend of Zelda: Breath of the Wild",
          genre: "Adventure",
          platform: "Nintendo Switch",
        },
        {
          gameId: 2,
          title: "Red Dead Redemption 2",
          genre: "Action",
          platform: "PlayStation 4",
        },
        {
          gameId: 3,
          title: "The Witcher 3: Wild Hunt",
          genre: "RPG",
          platform: "PC",
        },
      ],
    });
    expect(res.body.games.length).toBe(3);
  });

  it("Get /games/details/:id should return specific games with id", async () => {
    let res = await request(server).get("/games/details/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      game: {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
    });
  });
});
