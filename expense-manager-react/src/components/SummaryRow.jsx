export default function SummaryRow() {
  return (
    <div className="grid grid-cols-3 gap-3 px-4 py-4 bg-gray-100">
      {/* Income */}
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <p className="text-xs text-gray-500">Income</p>
        <p className="text-lg font-semibold text-green-600">
          ₹25,000
        </p>
      </div>

      {/* Expense */}
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <p className="text-xs text-gray-500">Expense</p>
        <p className="text-lg font-semibold text-red-600">
          ₹12,500
        </p>
      </div>

      {/* Balance */}
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <p className="text-xs text-gray-500">Balance</p>
        <p className="text-lg font-semibold text-blue-600">
          ₹12,500
        </p>
      </div>
    </div>
  );
}
