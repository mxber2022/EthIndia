import React from 'react';
import { Star, MapPin } from 'lucide-react';
import type { Hotel } from '../types';

interface HotelCardProps {
  hotel: Hotel;
  index: number;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, index }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover-scale"
      style={{ 
        opacity: 0,
        animation: `fadeIn 0.5s ease-out forwards ${index * 0.1}s`
      }}
    >
      <div className="relative group">
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
        <div className="flex items-center mt-1 text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{hotel.location}</span>
        </div>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 transition-colors duration-200 ${
                  i < hotel.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({hotel.reviewCount} verified reviews)
          </span>
        </div>
      </div>
    </div>
  );
}