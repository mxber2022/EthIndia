import React from 'react';
import type { Review } from '../../types';

interface ReviewFooterProps {
  review: Review;
}

export const ReviewFooter: React.FC<ReviewFooterProps> = ({ review }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {review.amenities.map((amenity) => (
          <span
            key={amenity}
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm transition-colors duration-200 hover:bg-gray-200"
          >
            {amenity}
          </span>
        ))}
      </div>
      
      <div className="text-sm text-gray-500">
        Posted on {review.date}
      </div>
    </div>
  );
};