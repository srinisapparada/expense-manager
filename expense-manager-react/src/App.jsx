import Header from "./components/Header";
import Tabs from "./components/Tabs";
import SummaryRow from "./components/SummaryRow";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Tabs />
      <SummaryRow />
    </div>
  );
}