export default function SummaryCards({ expenses }) {
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="cards">
      <div className="card">Total Spend ₹{total}</div>
      <div className="card">Expenses {expenses.length}</div>
    </div>
  );
}

