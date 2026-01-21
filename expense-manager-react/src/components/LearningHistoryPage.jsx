import LearningTimeline from "./LearningTimeline";

export default function LearningHistoryPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-center">
          Learning History
        </h1>

        <p className="text-center text-gray-600">
          A complete timeline of my journey building the AI Expense Tracker
        </p>

        <LearningTimeline />

      </div>
    </div>
  );
}
