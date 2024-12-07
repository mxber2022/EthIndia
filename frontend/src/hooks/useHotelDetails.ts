import { create } from 'zustand';
import type { Hotel } from '../types';

interface HotelDetailsState {
  isOpen: boolean;
  selectedHotel: Hotel | null;
  openDetails: (hotel: Hotel) => void;
  closeDetails: () => void;
}

export const useHotelDetails = create<HotelDetailsState>((set) => ({
  isOpen: false,
  selectedHotel: null,
  openDetails: (hotel) => set({ isOpen: true, selectedHotel: hotel }),
  closeDetails: () => set({ isOpen: false, selectedHotel: null }),
}));