import { useState, useEffect, useRef} from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import SummaryRow from "./components/SummaryRow";
import DailyList from "./components/DailyList";
import FloatingAddButton from "./components/FloatingAddButton";
import AddExpenseModal from "./components/AddExpenseModal";
import MonthlyView from "./components/MonthlyView";
import StatsView from "./components/StatsView";

export default function App() {
  const [activeTab, setActiveTab] = useState("daily");
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const isFirstLoad = useRef(true);

  // 🔹 LOAD from localStorage (runs once)
  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    console.log("Loaded from localStorage:", saved);
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  // 🔹 SAVE to localStorage (runs on every change)
  useEffect(() => {
  if (isFirstLoad.current) {
    isFirstLoad.current = false;
    return;
  }

  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );

  console.log("Saving to localStorage:", transactions);
}, [transactions]);

  const addTransaction = (tx) => {
    setTransactions((prev) => [tx, ...prev]);
};

  return (
    <>
      {/* Mobile screen */}
      <div className="max-w-md mx-auto bg-gray-100 min-h-screen relative">
      {/* Full screen */} 
      {/* <div className="w-full bg-gray-100 min-h-screen"> */}
    {/* </div> <div className="max-w-md md:max-w-4xl mx-auto bg-gray-100 min-h-screen"> */}
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
      {activeTab === "monthly" && (
        <MonthlyView transactions={transactions} />
      )}

      {activeTab === "stats" && (
        <StatsView transactions={transactions} />
      )}

      {activeTab === "daily" && (
        <>
          <SummaryRow transactions={transactions} />
          <DailyList transactions={transactions} />
        </>
      )}

      <FloatingAddButton onClick={() => setShowModal(true)} />

      {showModal && (
        <AddExpenseModal
          onClose={() => setShowModal(false)}
          onAdd={addTransaction}
        />
      )}
      </div>
    </>
  );
}