const express = require("express");
const { getAllEmployees, getEmployeesById } = require("./controllers");
const app = express();
app.use(express.json());

app.get("/employees", (req, res) => {
  let employees = getAllEmployees();
  res.json({ employees });
});

app.get("/employees/details/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let employee = getEmployeesById(id);
  res.json({ employee });
});

module.exports = { app };
