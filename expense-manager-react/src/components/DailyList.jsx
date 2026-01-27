import DayGroup from "./DayGroup";

export default function DailyList({ transactions }) {
  if (!transactions.length) {
    return (
      <p className="text-center text-gray-400 mt-6">
        No transactions yet
      </p>
    );
  }

  return (
    <div className="px-4">
      <DayGroup date="Today" transactions={transactions} />
    </div>
  );
}