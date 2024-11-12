

export interface Expense {
  id: string;
  description: string;
  cost: number;
}

export interface AppContextType {
  expenses: Expense[];
  budget: number;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
}