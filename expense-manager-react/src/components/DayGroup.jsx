import TransactionItem from "./TransactionItem";

export default function DayGroup({ day }) {
  return (
    <div className="mb-4">
      {/* Date header */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700">
          {day.date}
        </span>
        <span
          className={`text-sm font-medium ${
            day.total < 0 ? "text-red-500" : "text-green-600"
          }`}
        >
          ₹{Math.abs(day.total)}
        </span>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-xl shadow-sm divide-y">
        {day.transactions.map((tx) => (
          <TransactionItem key={tx.id} tx={tx} />
        ))}
      </div>
    </div>
  );
}
