function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-2">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

export default function DashboardCards({ total, budget, remaining }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

      <StatCard
        title="Total Spent"
        value={`₹${total}`}
        color="text-red-600"
      />

      <StatCard
        title="Monthly Budget"
        value={`₹${budget}`}
        color="text-blue-600"
      />

      <StatCard
        title="Remaining"
        value={`₹${remaining}`}
        color={remaining >= 0 ? "text-green-600" : "text-red-600"}
      />

    </div>
  );
}
