import { createContext, useState, ReactNode } from "react";
import { AppContextType, Expense } from "../types/types";

// Initialize with default values
const initialState: Omit<AppContextType, 'setExpenses' | 'setBudget'> = {
  expenses: [],
  budget: 1000, // Default budget value
};

export const AppContext = createContext<AppContextType>({
  ...initialState,
  setExpenses: () => {},
  setBudget: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<number>(initialState.budget);

  return (
    <AppContext.Provider
      value={{
        expenses,
        setExpenses,
        budget,
        setBudget,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};