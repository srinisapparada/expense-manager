import DayGroup from "./DayGroup";

export default function DailyList() {
  const days = [
    {
      date: "Today",
      total: -450,
      transactions: [
        { id: 1, title: "Coffee", category: "Food", amount: -150 },
        { id: 2, title: "Groceries", category: "Shopping", amount: -300 },
      ],
    },
    {
      date: "Yesterday",
      total: 1200,
      transactions: [
        { id: 3, title: "Salary", category: "Income", amount: 1200 },
      ],
    },
  ];

  return (
    <div className="px-4 pb-24">
      {days.map((day) => (
        <DayGroup key={day.date} day={day} />
      ))}
    </div>
  );
}
