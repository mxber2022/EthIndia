import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { WalletButton } from './WalletButton';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo />
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search hotels..."
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg transition-all duration-200 font-medium ${
                  isSearchFocused
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Search className={`absolute left-3 top-3 w-5 h-5 transition-colors duration-200 ${
                isSearchFocused ? 'text-blue-500' : 'text-gray-400'
              }`} />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  )
}