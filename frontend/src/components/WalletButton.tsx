import React from 'react';
import { Wallet } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

export const WalletButton: React.FC = () => {
  const { address, isConnecting, error, connect, disconnect } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleClick = () => {
    if (address) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={isConnecting}
        className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
          address
            ? 'bg-green-50 text-green-700 hover:bg-green-100'
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
        } ${isConnecting ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        <Wallet className="w-4 h-4 mr-2" />
        <span>
          {isConnecting
            ? 'Connecting...'
            : address
            ? formatAddress(address)
            : 'Connect Wallet'}
        </span>
      </button>
      {error && (
        <div className="absolute top-full mt-2 w-64 p-2 bg-red-50 text-red-600 text-sm rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}