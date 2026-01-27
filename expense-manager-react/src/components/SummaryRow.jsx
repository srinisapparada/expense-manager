export default function SummaryRow({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      <div className="bg-green-100 p-2 rounded text-center">
        <p className="text-xs text-gray-500">Income</p>
        <p className="font-semibold text-green-700">₹{income}</p>
      </div>

      <div className="bg-red-100 p-2 rounded text-center">
        <p className="text-xs text-gray-500">Expense</p>
        <p className="font-semibold text-red-700">₹{expense}</p>
      </div>

      <div className="bg-blue-100 p-2 rounded text-center">
        <p className="text-xs text-gray-500">Balance</p>
        <p className="font-semibold text-blue-700">₹{balance}</p>
      </div>
    </div>
  );
}