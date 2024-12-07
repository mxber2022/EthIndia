import React from 'react';
import { ReviewCard } from './ReviewCard';
import type { Review } from '../../types';

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <ReviewCard key={review.id} review={review} index={index} />
      ))}
    </div>
  );
};