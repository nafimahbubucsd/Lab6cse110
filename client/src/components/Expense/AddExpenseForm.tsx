import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { v4 as uuidv4 } from 'uuid';
import { createExpense } from "../../utils/expense-utils";

const AddExpenseForm = () => {
  const { expenses, setExpenses } = useContext(AppContext);
  
  const [description, setDescription] = useState<string>('');
  const [cost, setCost] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null); // Message for user feedback

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const costNumber = parseFloat(cost);
    if (isNaN(costNumber)) {
      setMessage("Please enter a valid cost.");
      return;
    }

    const newExpense = {
      id: uuidv4(),
      description: description,
      cost: costNumber,
    };

    try {
      await createExpense(newExpense); // Calls the updated createExpense function

      // Update expenses in context
      setExpenses([...(expenses || []), newExpense]);

      // Clear form fields and provide success feedback
      setDescription('');
      setCost('');
      setMessage("Expense added successfully!");
    } catch (error) {
      console.error('Failed to create expense:', error);
      setMessage("Failed to add expense. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="description">Description</label>
          <input
            required
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
      {message && <p className="mt-3">{message}</p>}
    </form>
  );
};

export default AddExpenseForm;