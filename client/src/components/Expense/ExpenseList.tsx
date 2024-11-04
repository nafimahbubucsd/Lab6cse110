import { useContext, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { fetchExpenses } from "../../utils/expense-utils";

const ExpenseList = () => {
  const { expenses, setExpenses } = useContext(AppContext);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const expenseList = await fetchExpenses();
      setExpenses(expenseList);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <ul className="list-group">
      {expenses && expenses.length > 0 ? (
        expenses.map((expense: Expense) => (
          <ExpenseItem
            key={expense.id}
            id={expense.id}
            description={expense.description}
            cost={expense.cost}
          />
        ))
      ) : (
        <li className="list-group-item">No expenses available</li>
      )}
    </ul>
  );
};

export default ExpenseList;