import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { HotelList } from "./components/Hotels/HotelList";
import { ReviewList } from "./components/Reviews/ReviewList";
import { WriteReviewModal } from "./components/Reviews/WriteReviewModal";
import { HotelDetails } from "./components/Hotels/HotelDetails";
import { useHotels } from "./hooks/useHotels";
import { useReviewModal } from "./hooks/useReviewModal";
import { useHotelDetails } from "./hooks/useHotelDetails";
import { useReviewContract } from "./hooks/useReviewContract";
import { Loader2, Shield } from "lucide-react";
import type { Review } from "./types";
import ZKEmailProofComponent from "./components/zkemail/zkemail";

function App() {
  const { hotels } = useHotels();
  const {
    isOpen: isReviewOpen,
    selectedHotel: reviewHotel,
    closeModal: closeReviewModal,
  } = useReviewModal();
  const {
    isOpen: isDetailsOpen,
    selectedHotel: detailsHotel,
    closeDetails,
  } = useHotelDetails();
  const { getHotelReviews, getReview, initialize, isInitialized } =
    useReviewContract();

  const [contractReviews, setContractReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isInitialized) {
      initialize().catch(console.error);
    }
  }, [initialize, isInitialized]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      if (!isInitialized) return;

      try {
        setIsLoading(true);

        // Fetch reviews for each hotel
        const allReviewPromises = hotels.map(async (hotel) => {
          const reviewIds = await getHotelReviews(hotel.id);
          const reviewPromises = reviewIds.map((id) => getReview(Number(id)));
          const hotelReviews = await Promise.all(reviewPromises);

          return hotelReviews.map((data) => ({
            id: data.timestamp.toString(),
            hotelId: hotel.id,
            hotelName: hotel.name,
            rating: Number(data.rating),
            review: data.reviewText,
            reviewer: data.reviewer,
            date: new Date(Number(data.timestamp) * 1000)
              .toISOString()
              .split("T")[0],
            verificationStatus: "verified",
            amenities: hotel.amenities,
            tlsVerification: {
              timestamp: new Date(Number(data.timestamp) * 1000).toISOString(),
              bookingRef: data.bookingProof,
              stayDates: {
                checkIn: "2024-03-01",
                checkOut: "2024-03-05",
              },
            },
          }));
        });

        const allReviews = await Promise.all(allReviewPromises);
        const flattenedReviews = allReviews.flat();

        // Sort by date, most recent first
        const sortedReviews = flattenedReviews.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setContractReviews(sortedReviews);
        setError(null);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch reviews"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllReviews();
  }, [hotels, getHotelReviews, getReview, isInitialized]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-3xl text-gray-900">
              Featured Hotels
            </h2>
            <div className="text-sm text-gray-500">
              Showing {hotels.length} verified properties
            </div>
          </div>
          <HotelList hotels={hotels} />
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-3xl text-gray-900">
              Latest Verified Reviews
            </h2>
            <div className="flex items-center text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
              <Shield className="w-4 h-4 mr-1.5" />
              <span>Verified by TLSNotary</span>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
              <p className="text-gray-500 animate-pulse">
                Loading verified reviews...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <ReviewList reviews={contractReviews} />
          )}
        </section>
      </main>

      {reviewHotel && (
        <WriteReviewModal
          isOpen={isReviewOpen}
          onClose={closeReviewModal}
          hotel={reviewHotel}
        />
      )}

      {detailsHotel && (
        <HotelDetails
          isOpen={isDetailsOpen}
          onClose={closeDetails}
          hotel={detailsHotel}
        />
      )}

      <ZKEmailProofComponent />
    </div>
  );
}

export default App;
