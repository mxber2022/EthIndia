import { create } from 'zustand';
import { ethers } from 'ethers';

interface WalletState {
  address: string | null;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  getSigner: () => Promise<ethers.Signer>;
}

export const useWallet = create<WalletState>((set, get) => ({
  address: null,
  isConnecting: false,
  error: null,
  
  connect: async () => {
    try {
      set({ isConnecting: true, error: null });
      
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to connect your wallet');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      set({ address, isConnecting: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
        isConnecting: false 
      });
      throw error;
    }
  },

  disconnect: () => {
    set({ address: null, error: null });
  },

  getSigner: async () => {
    if (!window.ethereum) {
      throw new Error('Please install MetaMask');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider.getSigner();
  }
}));