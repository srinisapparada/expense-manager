import { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("daily");

  const tabs = [
    { id: "daily", label: "Daily" },
    { id: "monthly", label: "Monthly" },
    { id: "stats", label: "Stats" },
  ];

  return (
    <div className="bg-white px-4">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-sm font-medium transition
              ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
