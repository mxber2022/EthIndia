import React from 'react';
import { Star, Shield, Clock } from 'lucide-react';
import type { Review } from '../types';

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
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{review.hotelName}</h3>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 transition-colors duration-200 ${
                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center">
          {review.verificationStatus === 'verified' ? (
            <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <Shield className="w-4 h-4 mr-1" />
              <span className="text-sm">Verified Stay</span>
            </div>
          ) : (
            <div className="flex items-center text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm">Pending Verification</span>
            </div>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{review.review}</p>
      
      <div className="flex flex-wrap gap-2">
        {review.amenities.map((amenity) => (
          <span
            key={amenity}
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm transition-colors duration-200 hover:bg-gray-200"
          >
            {amenity}
          </span>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Posted on {review.date}
      </div>
    </div>
  );
}