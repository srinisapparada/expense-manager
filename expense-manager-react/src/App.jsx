import { useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import SummaryRow from "./components/SummaryRow";
import DailyList from "./components/DailyList";
import FloatingAddButton from "./components/FloatingAddButton";
import AddExpenseModal from "./components/AddExpenseModal";

const addTransaction = (tx) => {
  console.log("Adding transaction:", tx);
  setTransactions((prev) => [tx, ...prev]);
};

export default function App() {
  const [activeTab, setActiveTab] = useState("daily");
  const [showModal, setShowModal] = useState(false);

  const [transactions, setTransactions] = useState([]);

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
      <SummaryRow transactions={transactions} />
      <DailyList transactions={transactions} />

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