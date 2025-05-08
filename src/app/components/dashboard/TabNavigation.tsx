// src/app/components/dashboard/TabNavigation.tsx
"use client";

import React from "react";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: {
    id: string;
    label: string;
    color: string;
  }[];
}

export const TabNavigation = ({ activeTab, onTabChange, tabs }: TabNavigationProps) => {
  return (
    <div className="flex space-x-4 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-4 py-2 ${
            activeTab === tab.id ? `${tab.color} text-white` : "bg-gray-200"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

