export default function MonthlyView({ transactions }) {
  const monthlyData = transactions.reduce((acc, tx) => {
    const month = tx.date.slice(0, 7); // YYYY-MM
    if (!acc[month]) acc[month] = 0;

    acc[month] += tx.type === "expense"
      ? tx.amount
      : -tx.amount;

    return acc;
  }, {});

  const months = Object.keys(monthlyData).sort().reverse();

  return (
    <div className="p-4 space-y-3">
      {months.map((month) => (
        <div
          key={month}
          className="bg-white p-3 rounded shadow flex justify-between"
        >
          <span>{month}</span>
          <span
            className={
              monthlyData[month] > 0
                ? "text-red-500"
                : "text-green-600"
            }
          >
            ₹{Math.abs(monthlyData[month])}
          </span>
        </div>
      ))}
    </div>
  );
}
