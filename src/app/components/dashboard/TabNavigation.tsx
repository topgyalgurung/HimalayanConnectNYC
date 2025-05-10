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

