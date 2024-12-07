import React from 'react';
import { ReviewHeader } from './ReviewHeader';
import { ReviewContent } from './ReviewContent';
import { ReviewFooter } from './ReviewFooter';
import type { Review } from '../../types';

interface ReviewCardProps {
  review: Review;
  index: number;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, index }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 mb-4 hover-scale"
      style={{ 
        opacity: 0,
        animation: `fadeIn 0.5s ease-out forwards ${index * 0.1}s`
      }}
    >
      <ReviewHeader review={review} />
      <ReviewContent review={review} />
      <ReviewFooter review={review} />
    </div>
  );
};