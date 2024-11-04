import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const ExpenseTotal = () => {
  const { expenses = [] } = useContext(AppContext); // Default expenses to an empty array

  const totalExpenses = expenses.reduce((total, item) => {
    return total + (item.cost || 0); // Ensure item.cost is a number
  }, 0);

  return (
    <div className="alert alert-primary">
      <span>Spent so far: ${totalExpenses}</span>
    </div>
  );
};

export default ExpenseTotal;