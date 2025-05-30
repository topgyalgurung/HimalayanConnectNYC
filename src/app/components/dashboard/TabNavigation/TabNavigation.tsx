// src/app/components/dashboard/TabNavigation.tsx
/**
 * tab navigation component for the dashboard
 * displays a set of tabs with customizable colors and labels.
 * provides a clean and consistent way to switch between different views or sections.

 */
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

export const TabNavigation = ({
  activeTab,
  onTabChange,
  tabs,
}: TabNavigationProps) => {
  return (
    <div className="flex space-x-4 mb-4 overflow-y-auto">
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
