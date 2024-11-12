import { Request, Response } from "express";
import { budget } from "./constants";
import { createExpenseEndpoints } from "./expenses/expense-endpoints";
import { createBudgetEndpoints } from "./budget/budget-endpoints";
import initDB from "./createTable";  // Import the initDB function

const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Initialize the database and set up endpoints
(async () => {
  const db = await initDB();  // Initialize the SQLite database

  // Root endpoint to test if the server is running
  app.get("/", (req: Request, res: Response) => {
    res.send({ "data": "Hello, TypeScript Express!" });
    res.status(200);
  });

  createExpenseEndpoints(app, db);  // Pass the database to expense endpoints
  createBudgetEndpoints(app, budget);
})();