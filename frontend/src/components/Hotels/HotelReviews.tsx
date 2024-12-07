import React from 'react';
import { ReviewCard } from '../Reviews/ReviewCard';
import type { Review } from '../../types';

interface HotelReviewsProps {
  reviews: Review[];
}

export const HotelReviews: React.FC<HotelReviewsProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No reviews yet. Be the first to review this hotel!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <ReviewCard key={review.id} review={review} index={index} />
      ))}
    </div>
  );
};