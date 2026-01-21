export default function ExpenseTable({ expenses }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      
      {/* Table Container */}
      <div className="max-h-[400px] overflow-y-auto">

        <table className="w-full border-collapse">
          
          {/* Sticky Header */}
          <thead className="sticky top-0 z-10 bg-gray-100">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">
                Description
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">
                Category
              </th>
              <th className="p-3 text-right text-sm font-semibold text-gray-600">
                Amount (₹)
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6 text-gray-500"
                >
                  No expenses added yet
                </td>
              </tr>
            ) : (
              expenses.map((e, index) => (
                <tr
                  key={index}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="p-3 text-sm text-gray-700">
                    {e.date}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {e.desc}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {e.category}
                  </td>
                  <td className="p-3 text-sm text-right font-medium">
                    ₹{e.amount}
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
