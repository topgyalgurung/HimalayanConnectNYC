// src/app/hooks/useModal.ts
import { useState } from "react";

export function useModal<T = any>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const openModal = (modalData: T) => {
    setData(modalData);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setData(null);
  };

  return {
    isOpen,
    data,
    openModal,
    closeModal,
  };
}