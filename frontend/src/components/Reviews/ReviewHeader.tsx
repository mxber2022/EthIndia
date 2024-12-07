import React from 'react';
import { ReviewBadge } from './ReviewBadge';
import { ReviewRating } from './ReviewRating';
import type { Review } from '../../types';

interface ReviewHeaderProps {
  review: Review;
}

export const ReviewHeader: React.FC<ReviewHeaderProps> = ({ review }) => {
  return (
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{review.hotelName}</h3>
        <ReviewRating rating={review.rating} />
      </div>
      <ReviewBadge status={review.verificationStatus} />
    </div>
  );
};