/**
 * TabButton Component
 * 
 * A reusable button component for tab navigation.
 * Provides visual feedback for active state and hover effects.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.label - Button text
 * @param {boolean} props.isActive - Current active state
 * @param {Function} props.onClick - Click handler
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @example
 * <TabButton
 *   label="Overview"
 *   isActive={activeTab === "overview"}
 *   onClick={() => setActiveTab("overview")}
 * />
 */
import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const TabButton: React.FC<TabButtonProps> = ({ 
  label, 
  isActive, 
  onClick,
  className = ''
}) => (
  <button
    className={`px-4 py-2 font-medium ${
      isActive
        ? "border-b-2 border-blue-600 text-blue-600"
        : "text-gray-500 hover:text-blue-500"
    } ${className}`}
    onClick={onClick}
  >
    {label.charAt(0).toUpperCase() + label.slice(1)}
  </button>
);

export default TabButton; 