/**
 * usePopup Hook
 * 
 * A custom hook for managing popup state and data.
 * Provides functionality for opening and closing popups with associated data.

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