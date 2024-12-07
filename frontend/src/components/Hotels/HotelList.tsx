import React from 'react';
import { HotelCard } from './HotelCard';
import type { Hotel } from '../../types';

interface HotelListProps {
  hotels: Hotel[];
}

export const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel, index) => (
        <HotelCard key={hotel.id} hotel={hotel} index={index} />
      ))}
    </div>
  );
};