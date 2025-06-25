"use client";

import { useState } from "react";

type Tab = {
  label: string;
  content: React.ReactNode;
};

interface TabsProps {
  tabs: Tab[];
}

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="my-5 flex justify-center border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`px-6 py-2 text-xl font-semibold border-b-2 transition-all duration-200
              ${
                activeTab === tab.label
                  ? "text-sunset-orange border-sunset-orange"
                  : "text-gray-600 border-transparent hover:text-sunset-orange cursor-pointer"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="">
        {tabs.map((tab) =>
          tab.label === activeTab ? (
            <div key={tab.label}>{tab.content}</div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Tabs;
