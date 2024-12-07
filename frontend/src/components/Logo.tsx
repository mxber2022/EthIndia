import React from 'react';
import { Shield, Hotel, CheckCircle } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center group cursor-pointer">
      <div className="relative">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
        
        {/* Logo container */}
        <div className="relative bg-white rounded-xl p-2.5 transition-transform duration-500 group-hover:scale-105">
          <div className="relative">
            {/* Base shield */}
            <Shield className="w-8 h-8 text-blue-600 transition-all duration-500 group-hover:text-indigo-600" />
            
            {/* Hotel icon overlay */}
            <Hotel className="absolute inset-0 w-8 h-8 text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100" />
            
            {/* Verification checkmark */}
            <CheckCircle className="absolute -bottom-1 -right-1 w-4 h-4 text-green-500 animate-bounce" />
          </div>
        </div>
      </div>
      
      <div className="ml-3.5">
        <h1 className="font-display text-[1.75rem] font-bold leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Trust
          </span>
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Stay
          </span>
        </h1>
        <div className="flex items-center space-x-1.5 mt-0.5">
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            Verified Reviews
          </span>
          <Shield className="w-3 h-3 text-blue-500" />
        </div>
      </div>
    </div>
  );
};