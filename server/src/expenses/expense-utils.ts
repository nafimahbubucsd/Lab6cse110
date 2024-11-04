import { Expense } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

// Creates a new expense entry in the database
export async function createExpenseServer(req: Request, res: Response, db: Database) {
    const { id, cost, description } = req.body;

    // Validate the request body fields
    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    try {
        // Insert a new expense into the database
        await db.run(
            'INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);',
            [id, description, cost]
        );
        const newExpense: Expense = { id, description, cost };
        res.status(201).send(newExpense);
    } catch (error) {
        res.status(400).send({ error: `Expense could not be created, ${error}` });
    }
}

// Deletes an expense from the database by ID
export async function deleteExpense(req: Request, res: Response, db: Database) {
    const { id } = req.params;

    try {
        // Attempt to delete the expense by ID
        const result = await db.run('DELETE FROM expenses WHERE id = ?', [id]);
        if (result.changes === 0) {
            return res.status(404).send({ error: "Expense not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: `Could not delete expense, ${error}` });
    }
}

// Retrieves all expenses from the database
export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        // Fetch all expense records from the database
        const expenses = await db.all<Expense[]>('SELECT * FROM expenses');
        res.status(200).send(expenses);
    } catch (error) {
        res.status(500).send({ error: `Could not retrieve expenses, ${error}` });
    }
}