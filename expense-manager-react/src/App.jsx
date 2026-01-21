import Header from "./components/Header";
import Tabs from "./components/Tabs";
import SummaryRow from "./components/SummaryRow";
import DailyList from "./components/DailyList";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Tabs />
      <SummaryRow />
      <DailyList />
    </div>
  );
}