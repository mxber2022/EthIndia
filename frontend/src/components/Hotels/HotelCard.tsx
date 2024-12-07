import React from 'react';
import { MapPin, PenLine, Eye } from 'lucide-react';
import { HotelRating } from './HotelRating';
import { useReviewModal } from '../../hooks/useReviewModal';
import { useHotelDetails } from '../../hooks/useHotelDetails';
import type { Hotel } from '../../types';

interface HotelCardProps {
  hotel: Hotel;
  index: number;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, index }) => {
  const openModal = useReviewModal((state) => state.openModal);
  const openDetails = useHotelDetails((state) => state.openDetails);

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover-scale"
      style={{ 
        opacity: 0,
        animation: `fadeIn 0.5s ease-out forwards ${index * 0.1}s`
      }}
    >
      <div className="relative group cursor-pointer" onClick={() => openDetails(hotel)}>
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal(hotel);
            }}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-50 flex items-center space-x-2"
          >
            <PenLine className="w-4 h-4" />
            <span>Write Review</span>
          </button>
          <button
            className="bg-white text-gray-600 px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-50 flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
        <div className="flex items-center mt-1 text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{hotel.location}</span>
        </div>
        <HotelRating rating={hotel.rating} reviewCount={hotel.reviewCount} />
        <div className="mt-2 text-lg font-semibold text-blue-600">
          ${hotel.pricePerNight}
          <span className="text-sm text-gray-500">/night</span>
        </div>
      </div>
    </div>
  );
};