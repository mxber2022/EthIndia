import { create } from 'zustand';
import type { Hotel } from '../types';

interface ReviewModalState {
  isOpen: boolean;
  selectedHotel: Hotel | null;
  openModal: (hotel: Hotel) => void;
  closeModal: () => void;
}

export const useReviewModal = create<ReviewModalState>((set) => ({
  isOpen: false,
  selectedHotel: null,
  openModal: (hotel) => set({ isOpen: true, selectedHotel: hotel }),
  closeModal: () => set({ isOpen: false, selectedHotel: null }),
}));