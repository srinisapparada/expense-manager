import TransactionItem from "./TransactionItem";

export default function DayGroup({ date, transactions }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm text-gray-500 mb-2">{date}</h3>

      <div className="space-y-2">
        {transactions.map((tx) => (
          <TransactionItem key={tx.id} tx={tx} />
        ))}
      </div>
    </div>
  );
}