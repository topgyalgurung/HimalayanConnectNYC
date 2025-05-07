/**
 * TabNavigation Component
 * 
 * A client-side component that provides navigation tabs for different resource views.
 * Features:
 * - Displays tabs for different resource states (new, edit, approved, rejected)
 * - Handles tab switching with visual feedback
 * - Uses consistent styling with conditional classes
 * 
 * @component
 * @param {string} activeTab - Currently active tab
 * @param {Function} onTabChange - Callback function to handle tab changes
 * 
 * @example
 * <TabNavigation 
 *   activeTab="new"
 *   onTabChange={handleTabChange}
 * />
 */
"use client";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="flex space-x-4 mb-4">
      <button
        className={`px-4 py-2 ${
          activeTab === "new" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => onTabChange("new")}
      >
        New Submissions
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === "edit" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => onTabChange("edit")}
      >
        Edit Submissions
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === "approved" ? "bg-green-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => onTabChange("approved")}
      >
        Approved
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === "rejected" ? "bg-red-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => onTabChange("rejected")}
      >
        Rejected
      </button>
    </div>
  );
}; 