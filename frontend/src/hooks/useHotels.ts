import { create } from "zustand";
import type { Hotel, Review } from "../types";

interface HotelState {
  hotels: Hotel[];
  reviews: Review[];
  selectedHotel: Hotel | null;
  setSelectedHotel: (hotel: Hotel | null) => void;
}

// This would typically fetch from an API
const sampleHotels: Hotel[] = [
  {
    id: "1",
    name: "Grand Plaza Hotel",
    location: "New York City, NY",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    rating: 4.5,
    reviewCount: 5,
    pricePerNight: 299,
    amenities: ["Pool", "Spa", "Restaurant", "Gym", "Free WiFi"],
  },
  {
    id: "2",
    name: "Oceanview Resort",
    location: "Miami Beach, FL",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
    rating: 4.8,
    reviewCount: 2,
    pricePerNight: 399,
    amenities: ["Beachfront", "Pool", "Spa", "Restaurant", "Free WiFi"],
  },
  {
    id: "3",
    name: "Mountain Lodge",
    location: "Aspen, CO",
    imageUrl: "https://images.unsplash.com/photo-1469796466635-455ede028aca",
    rating: 4.7,
    reviewCount: 0,
    pricePerNight: 499,
    amenities: [
      "Ski-in/Ski-out",
      "Spa",
      "Restaurant",
      "Fireplace",
      "Free WiFi",
    ],
  },
];

const sampleReviews: Review[] = [
  {
    id: "1",
    hotelId: "1",
    hotelName: "Grand Plaza Hotel",
    rating: 4,
    review:
      "Excellent stay with outstanding service. The staff was very accommodating and the rooms were immaculate. The location is perfect for exploring the city.",
    date: "2024-03-15",
    verificationStatus: "verified",
    amenities: ["Pool", "Spa", "Restaurant"],
    tlsVerification: {
      timestamp: "2024-03-15T10:30:00Z",
      bookingRef: "GP123456",
      stayDates: {
        checkIn: "2024-03-10",
        checkOut: "2024-03-15",
      },
    },
  },
  {
    id: "2",
    hotelId: "2",
    hotelName: "Oceanview Resort",
    rating: 5,
    review:
      "Beautiful beachfront property with breathtaking views. The infinity pool is amazing and the breakfast buffet offers great variety.",
    date: "2024-03-10",
    verificationStatus: "verified",
    amenities: ["Beachfront", "Pool", "Gym"],
    tlsVerification: {
      timestamp: "2024-03-10T15:45:00Z",
      bookingRef: "OR789012",
      stayDates: {
        checkIn: "2024-03-05",
        checkOut: "2024-03-10",
      },
    },
  },
];

export const useHotels = create<HotelState>((set) => ({
  hotels: sampleHotels,
  reviews: sampleReviews,
  selectedHotel: null,
  setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),
}));
