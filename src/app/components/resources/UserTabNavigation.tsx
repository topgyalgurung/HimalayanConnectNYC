/**
 * UserTabNavigation Component
 * 
 * A client-side component that provides navigation tabs for user dashboard views.
 * Features:
 * - Displays tabs for different user actions (new, suggest, reviews, favorites)
 * - Handles tab switching with visual feedback
 * - Uses consistent styling with conditional classes
 * 
 * @component
 * @param {Object} props
 * @param {string} props.activeTab - Currently active tab
 * @param {Function} props.onTabChange - Callback function to handle tab changes
 * 
 * @example
 * <UserTabNavigation 
 *   activeTab="new"
 *   onTabChange={handleTabChange}
 * />
 */
"use client";

interface UserTabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const UserTabNavigation = ({ activeTab, onTabChange }: UserTabNavigationProps) => {
  return (
    <div className="flex space-x-4 mb-4">
      <button
        className={`px-4 py-2 ${
          activeTab === "new" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => onTabChange("new")}
      >
        New
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === "suggest" ? "bg-green-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => onTabChange("suggest")}
      >
        Suggest Edit
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === "reviews" ? "bg-green-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => onTabChange("reviews")}
      >
        Reviews
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === "likes" ? "bg-green-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => onTabChange("likes")}
      >
        Favorites
      </button>
    </div>
  );
}; 