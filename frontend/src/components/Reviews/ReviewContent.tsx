import React from 'react';
import { formatWalletAddress } from '../../utils/formatters';
import type { Review } from '../../types';

interface ReviewContentProps {
  review: Review;
}

export const ReviewContent: React.FC<ReviewContentProps> = ({ review }) => {
  return (
    <div className="mb-4">
      <p className="text-gray-600 mb-2">{review.review}</p>
      <div className="text-sm text-gray-500">
        Written by{' '}
        <span className="font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
          {formatWalletAddress(review.reviewer)}
        </span>
      </div>
    </div>
  );
};