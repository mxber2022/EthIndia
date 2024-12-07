import React from 'react';
import { MapPin, Star } from 'lucide-react';
import type { Hotel } from '../../types';

interface HotelInfoProps {
  hotel: Hotel;
}

export const HotelInfo: React.FC<HotelInfoProps> = ({ hotel }) => {
  return (
    <div className="animate-fade-in">
      <div className="relative aspect-video rounded-lg overflow-hidden mb-6 group">
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center text-gray-600 mb-2 hover:text-blue-600 transition-colors duration-200">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{hotel.location}</span>
          </div>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 transition-colors duration-200 ${
                    i < hotel.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({hotel.reviewCount} reviews)
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {hotel.amenities.map((amenity, index) => (
              <span
                key={amenity}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 cursor-default"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.5s ease-out forwards'
                }}
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="text-right ml-6">
          <div className="text-2xl font-bold text-blue-600 animate-float">
            ${hotel.pricePerNight}
            <span className="text-sm text-gray-500 font-normal">/night</span>
          </div>
        </div>
      </div>
    </div>
  );
};