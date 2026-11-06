import { Children, useState } from "react";

interface TabGroupProps {
  tabs: string[];
  defaultTab?: string;
  label?: string;
  children: React.ReactNode;
}

export function TabGroup({
  tabs,
  defaultTab,
  label = "Options",
  children,
}: TabGroupProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]);
  const panels = Children.toArray(children);
  const activeIndex = Math.max(tabs.indexOf(activeTab), 0);
  const baseId = `tab-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="tab-group">
      <div className="tab-buttons" role="tablist" aria-label={label}>
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            id={`${baseId}-${tab}`}
            aria-selected={activeTab === tab}
            aria-controls={`${baseId}-panel`}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div
        className="tab-content"
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-${activeTab}`}
      >
        {panels[activeIndex]}
      </div>
    </div>
  );
}
