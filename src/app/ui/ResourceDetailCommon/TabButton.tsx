/**
 * tab button component
 * provides visual feedback for active state and hover effects.

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