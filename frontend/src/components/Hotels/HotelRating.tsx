import React from 'react';
import { Star } from 'lucide-react';

interface HotelRatingProps {
  rating: number;
  reviewCount: number;
}

export const HotelRating: React.FC<HotelRatingProps> = ({ rating, reviewCount }) => {
  return (
    <div className="flex items-center mt-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 transition-colors duration-200 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="ml-2 text-sm text-gray-600">
        ({reviewCount} verified reviews)
      </span>
    </div>
  );
};