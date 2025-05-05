// src/app/hooks/useModal.ts
import { useState } from "react";

export function usePopup<T = any>() {
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