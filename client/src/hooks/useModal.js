import { useState } from 'react';

export const useModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  }

  return [isModalOpen, handleModalToggle];
};
