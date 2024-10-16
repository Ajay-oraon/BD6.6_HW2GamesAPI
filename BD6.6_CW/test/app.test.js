const { app } = require("../index");
const { getAllEmployees, getEmployeesById } = require("../controllers");
const request = require("supertest");
const http = require("http");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllEmployees: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("Controllers Function test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all employees", () => {
    let mockEmployees = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];
    getAllEmployees.mockReturnValue(mockEmployees);
    let result = getAllEmployees();
    expect(result).toEqual(mockEmployees);
    expect(result.length).toBe(3);
  });
});

describe("API endpoints test", () => {
  it("Get /employees should get all employees", async () => {
    let res = await request(server).get("/employees");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      employees: [
        {
          employeeId: 1,
          name: "Rahul Sharma",
          email: "rahul.sharma@example.com",
          departmentId: 1,
          roleId: 1,
        },
        {
          employeeId: 2,
          name: "Priya Singh",
          email: "priya.singh@example.com",
          departmentId: 2,
          roleId: 2,
        },
        {
          employeeId: 3,
          name: "Ankit Verma",
          email: "ankit.verma@example.com",
          departmentId: 1,
          roleId: 3,
        },
      ],
    });
    expect(res.body.employees.length).toBe(3);
  });

  it("Get /employees/details/:id should return specific employee with id", async () => {
    let res = await request(server).get("/employees/details/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      employee: {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
    });
  });
});
