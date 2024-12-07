import React from 'react';
import { Star } from 'lucide-react';

interface ReviewRatingProps {
  rating: number;
}

export const ReviewRating: React.FC<ReviewRatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center mt-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 transition-colors duration-200 ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};