import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { v4 as uuidv4 } from 'uuid';
import { createExpense } from "../../utils/expense-utils";

const AddExpenseForm = () => {
  const { expenses, setExpenses } = useContext(AppContext);
  
  const [description, setDescription] = useState<string>('');
  const [cost, setCost] = useState<string>('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const costNumber = parseFloat(cost);
    if (isNaN(costNumber)) return;

    const newExpense = {
      id: uuidv4(),
      description: description,
      cost: costNumber,
    };

    try {
      await createExpense(newExpense);
      
      // Ensure expenses is an array before setting new state
      setExpenses([...(expenses || []), newExpense]);

      setDescription('');
      setCost('');
    } catch (error) {
      console.error('Failed to create expense:', error);
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
    </form>
  );
};

export default AddExpenseForm;