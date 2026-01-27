export default function TransactionItem({ tx }) {
  return (
    <div className="flex justify-between bg-white p-3 rounded shadow">
      <div>
        <p className="font-medium">{tx.title}</p>
        <p className="text-xs text-gray-400">{tx.category}</p>
      </div>

      <p
        className={`font-semibold ${
          tx.type === "expense"
            ? "text-red-500"
            : "text-green-500"
        }`}
      >
        {tx.type === "expense" ? "-" : "+"}₹{tx.amount}
      </p>
    </div>
  );
}

