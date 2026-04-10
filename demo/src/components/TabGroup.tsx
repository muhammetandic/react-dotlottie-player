import { useState } from "react";

interface TabGroupProps {
  tabs: string[];
  defaultTab: string;
  children: React.ReactNode;
}

export function TabGroup({ tabs, defaultTab, children }: TabGroupProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <div className="tab-group">
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {Array.isArray(children) 
          ? children.find((_, i) => tabs[i] === activeTab)
          : activeTab === defaultTab ? children : null
        }
      </div>
    </div>
  );
}
