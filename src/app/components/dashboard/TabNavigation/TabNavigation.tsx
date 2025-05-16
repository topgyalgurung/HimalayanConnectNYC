// src/app/components/dashboard/TabNavigation.tsx
/**
 * TabNavigation Component
 *
 * A navigation component that displays a set of tabs with customizable colors and labels.
 * Provides a clean and consistent way to switch between different views or sections.
 *
 * @component
 * @param {Object} props
 * @param {string} props.activeTab - Currently active tab ID
 * @param {Function} props.onTabChange - Handler for tab change events
 * @param {Array<{id: string, label: string, color: string}>} props.tabs - Array of tab configurations
 *
 * @example
 * <TabNavigation
 *   activeTab="home"
 *   onTabChange={handleTabChange}
 *   tabs={[
 *     { id: "home", label: "Home", color: "bg-blue-500" },
 *     { id: "profile", label: "Profile", color: "bg-green-500" }
 *   ]}
 * />
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
    <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-3 py-1.5 text-sm whitespace-nowrap rounded-md transition-colors ${
            activeTab === tab.id
              ? `${tab.color} text-white`
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
