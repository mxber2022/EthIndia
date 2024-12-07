export interface TLSVerification {
  timestamp: string;
  bookingRef: string;
  stayDates: {
    checkIn: string;
    checkOut: string;
  };
}

export interface Review {
  id: string;
  hotelId: string;
  hotelName: string;
  rating: number;
  review: string;
  date: string;
  verificationStatus: 'verified' | 'pending';
  amenities: string[];
  tlsVerification?: TLSVerification;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  amenities: string[];
}