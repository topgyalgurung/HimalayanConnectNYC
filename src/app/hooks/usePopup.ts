/**
 * usePopup Hook
 * 
 * A custom hook for managing popup state and data.
 * Provides functionality for opening and closing popups with associated data.
 * 
 * @template T - Type of data to be stored in the popup
 * @returns {Object} Popup state and control functions
 * @returns {boolean} isOpen - Current popup visibility state
 * @returns {T|null} data - Current popup data
 * @returns {Function} openPopup - Function to open popup with data
 * @returns {Function} closePopup - Function to close popup and clear data
 */
import { useState } from "react";

export function usePopup<T = unknown>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const openPopup = (modalData: T) => {
    setData(modalData);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setData(null);
  };

  return {
    isOpen,
    data,
    openPopup,
    closePopup,
  };
}