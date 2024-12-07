import { create } from 'zustand';
import { ethers } from 'ethers';
import { ReviewContract } from '../contracts/ReviewContract';

interface ReviewContractState {
  contract: ReviewContract | null;
  isInitialized: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  mintReview: (params: {
    hotelId: string;
    rating: number;
    reviewText: string;
    bookingProof: string;
  }) => Promise<ethers.TransactionResponse>;
  getHotelReviews: (hotelId: string) => Promise<any[]>;
  getReview: (reviewId: bigint) => Promise<any>;
}

export const useReviewContract = create<ReviewContractState>((set, get) => ({
  contract: null,
  isInitialized: false,
  error: null,

  initialize: async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ReviewContract(provider);
      await contract.connect(signer);

      set({ contract, isInitialized: true, error: null });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to initialize contract',
        isInitialized: false 
      });
      throw error;
    }
  },

  mintReview: async ({ hotelId, rating, reviewText, bookingProof }) => {
    const { contract, isInitialized } = get();
    
    if (!isInitialized || !contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const tx = await contract.mintReview(hotelId, rating, reviewText, bookingProof);
      return tx;
    } catch (error: any) {
      // Handle specific contract errors
      if (error.code === 'ACTION_REJECTED') {
        throw new Error('Transaction rejected by user');
      }
      if (error.code === 'INSUFFICIENT_FUNDS') {
        throw new Error('Insufficient funds for transaction');
      }
      throw error;
    }
  },

  getHotelReviews: async (hotelId: string) => {
    const { contract, isInitialized } = get();
    
    if (!isInitialized || !contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const reviews = await contract.getHotelReviews(hotelId);
      return reviews;
    } catch (error) {
      console.error('Error getting hotel reviews:', error);
      throw error;
    }
  },

  getReview: async (reviewId: bigint) => {
    const { contract, isInitialized } = get();
    
    if (!isInitialized || !contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const review = await contract.getReview(reviewId);
      return review;
    } catch (error) {
      console.error('Error getting review:', error);
      throw error;
    }
  }
}));