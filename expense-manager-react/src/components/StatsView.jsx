export default function StatsView({ transactions }) {
  const categoryTotals = transactions.reduce((acc, tx) => {
    if (tx.type !== "expense") return acc;

    acc[tx.category] =
      (acc[tx.category] || 0) + tx.amount;

    return acc;
  }, {});

  const max = Math.max(...Object.values(categoryTotals), 1);

  return (
    <div className="p-4 space-y-4">
      {Object.entries(categoryTotals).map(
        ([category, amount]) => (
          <div key={category}>
            <div className="flex justify-between text-sm">
              <span>{category}</span>
              <span>₹{amount}</span>
            </div>

            <div className="h-2 bg-gray-200 rounded mt-1">
              <div
                className="h-2 bg-blue-500 rounded"
                style={{
                  width: `${(amount / max) * 100}%`,
                }}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}