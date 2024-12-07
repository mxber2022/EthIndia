import React from 'react';
import { Logo } from '../Logo';
import { SearchBar } from './SearchBar';
import { ActionButtons } from './ActionButtons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo />
          <SearchBar />
          <ActionButtons />
        </div>
      </div>
    </header>
  );
};