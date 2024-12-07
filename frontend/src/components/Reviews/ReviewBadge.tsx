import React from 'react';
import { Shield, Clock } from 'lucide-react';

interface ReviewBadgeProps {
  status: 'verified' | 'pending';
}

export const ReviewBadge: React.FC<ReviewBadgeProps> = ({ status }) => {
  if (status === 'verified') {
    return (
      <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
        <Shield className="w-4 h-4 mr-1" />
        <span className="text-sm">Verified Stay</span>
      </div>
    );
  }

  return (
    <div className="flex items-center text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
      <Clock className="w-4 h-4 mr-1" />
      <span className="text-sm">Pending Verification</span>
    </div>
  );
};