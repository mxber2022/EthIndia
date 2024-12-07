import React, { useEffect, useState } from 'react';
import { X, Shield, Loader2 } from 'lucide-react';
import { useReviewContract } from '../../hooks/useReviewContract';
import { HotelInfo } from './HotelInfo';
import { HotelReviews } from './HotelReviews';
import { Modal } from '../ui/Modal';
import type { Hotel, Review } from '../../types';

interface HotelDetailsProps {
  hotel: Hotel;
  isOpen: boolean;
  onClose: () => void;
}

export const HotelDetails: React.FC<HotelDetailsProps> = ({ hotel, isOpen, onClose }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { getHotelReviews, getReview, initialize, isInitialized } = useReviewContract();

  useEffect(() => {
    if (!isInitialized) {
      initialize().catch(console.error);
    }
  }, [initialize, isInitialized]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!isInitialized) return;
      
      try {
        setIsLoading(true);
        const reviewIds = await getHotelReviews(hotel.id);
        const reviewPromises = reviewIds.map(id => getReview(Number(id)));
        const reviewData = await Promise.all(reviewPromises);
        
        const formattedReviews: Review[] = reviewData.map((data, index) => ({
          id: reviewIds[index].toString(),
          hotelId: hotel.id,
          hotelName: hotel.name,
          rating: Number(data.rating),
          review: data.reviewText,
          reviewer: data.reviewer,
          date: new Date(Number(data.timestamp) * 1000).toISOString().split('T')[0],
          verificationStatus: 'verified',
          amenities: hotel.amenities,
          tlsVerification: {
            timestamp: new Date(Number(data.timestamp) * 1000).toISOString(),
            bookingRef: data.bookingProof,
            stayDates: {
              checkIn: '2024-03-01',
              checkOut: '2024-03-05'
            }
          }
        }));

        setReviews(formattedReviews);
        setError(null);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchReviews();
    }
  }, [hotel.id, isOpen, getHotelReviews, getReview, isInitialized, hotel.name, hotel.amenities]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-xl w-full max-w-4xl mx-4 animate-scale-in">
        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-display font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {hotel.name}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <HotelInfo hotel={hotel} />
          
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Verified Reviews
              </h3>
              <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full animate-pulse-slow">
                <Shield className="w-4 h-4 mr-1.5" />
                <span>TLSNotary Verified</span>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
                <p className="text-gray-500 animate-pulse">Loading reviews...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-red-50 rounded-lg animate-fade-in">
                <p className="text-red-600">{error}</p>
              </div>
            ) : (
              <HotelReviews reviews={reviews} />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};