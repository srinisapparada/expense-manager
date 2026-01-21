import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import LearningHistoryPage from "./components/LearningHistoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-white shadow-sm px-6 py-3 flex justify-between">
        <span className="font-bold">AI Expense Tracker</span>

        <div className="flex gap-4 text-blue-600">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/learning-history" className="hover:underline">
            Learning History
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learning-history" element={<LearningHistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
