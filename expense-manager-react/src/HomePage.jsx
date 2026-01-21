import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import DashboardCards from "./components/DashboardCards";
import ExpenseTable from "./components/ExpenseTable";

export default function HomePage() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  const totalSpent = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const budget = 50000;
  const remaining = budget - totalSpent;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-center">
          AI Expense Tracker
        </h1>

        <DashboardCards
          total={totalSpent}
          budget={budget}
          remaining={remaining}
        />

        <ExpenseForm onAdd={addExpense} />

        <ExpenseTable expenses={expenses} />

      </div>
    </div>
  );
}
