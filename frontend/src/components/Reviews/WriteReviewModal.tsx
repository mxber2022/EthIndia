import React, { useState, useEffect } from 'react';
import { X, Upload, Star, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { useReviewContract } from '../../hooks/useReviewContract';
import { Toast } from '../ui/Toast';
import type { Hotel } from '../../types';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: Hotel;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ isOpen, onClose, hotel }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [bookingFile, setBookingFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { address, connect } = useWallet();
  const { mintReview, initialize, isInitialized } = useReviewContract();

  useEffect(() => {
    if (!isInitialized) {
      initialize().catch(console.error);
    }
  }, [initialize, isInitialized]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingFile || !address) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const bookingProof = bookingFile.name;

      const tx = await mintReview({
        hotelId: hotel.id,
        rating,
        reviewText: review,
        bookingProof
      });

      await tx.wait();
      
      // Show success animation
      setShowSuccess(true);
      
      // Reset form
      setRating(0);
      setReview('');
      setBookingFile(null);
      
      // Close modal after a delay
      setTimeout(() => {
        onClose();
        setShowSuccess(false);
      }, 2000);
    } catch (err: any) {
      console.error('Error submitting review:', err);
      setError(err?.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConnect = async () => {
    try {
      await connect();
    } catch (err: any) {
      setError(err?.message || 'Failed to connect wallet');
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-full max-w-2xl mx-4 animate-scale-in relative overflow-hidden">
          {/* Success Overlay */}
          {showSuccess && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-10 animate-fade-in">
              <div className="bg-green-100 rounded-full p-3 mb-4">
                <CheckCircle className="w-12 h-12 text-green-500 animate-bounce" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Review Submitted!</h3>
              <p className="text-green-600">Thank you for sharing your experience</p>
            </div>
          )}

          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold">Write a Review for {hotel.name}</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600"
              disabled={isSubmitting}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="mx-6 mt-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Error</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {!address ? (
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-4">Please connect your wallet to submit a review</p>
              <button
                onClick={handleConnect}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Connect Wallet
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      className="focus:outline-none transform transition-transform hover:scale-110"
                      disabled={isSubmitting}
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          value <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                  disabled={isSubmitting}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 disabled:opacity-50 transition-all"
                  placeholder="Share your experience..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booking Confirmation
                </label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center transition-colors hover:border-blue-400">
                  {bookingFile ? (
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm text-gray-600">{bookingFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setBookingFile(null)}
                        disabled={isSubmitting}
                        className="text-red-500 hover:text-red-600 disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-gray-400" />
                      <div className="text-sm text-gray-600">
                        Upload your booking confirmation for verification
                      </div>
                      <input
                        type="file"
                        onChange={(e) => setBookingFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="booking-file"
                        disabled={isSubmitting}
                        accept=".pdf,.jpg,.png"
                      />
                      <label
                        htmlFor="booking-file"
                        className={`inline-block px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-all ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        Select File
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !rating || !review || !bookingFile}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Review'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <Toast
        message="Review submitted successfully!"
        isVisible={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
};