export default function TransactionItem({ tx }) {
  return (
    <div className="flex justify-between items-center px-4 py-3">
      <div>
        <p className="text-sm font-medium">{tx.title}</p>
        <p className="text-xs text-gray-400">{tx.category}</p>
      </div>

      <p
        className={`text-sm font-semibold ${
          tx.amount < 0 ? "text-red-500" : "text-green-600"
        }`}
      >
        {tx.amount < 0 ? "-" : "+"}₹{Math.abs(tx.amount)}
      </p>
    </div>
  );
}
