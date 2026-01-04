export interface Hotel {
  _id: string;
  name: string;
  type: string;
  location: {
    city: string;
    country: string;
  };
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  originalPrice?: number;
  amenities: string[];
  featured: boolean;
  image: string[];
  distance?: string;
  description?: string;
}

export interface HotelsResponse {
  success: boolean;
  data: Hotel[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalHotels: number;
    hotelsPerPage: number;
  };
}

export interface FilterOption {
  id: string;
  label: string;
  count: number;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface PriceBreakdown {
  pricePerNight: number;
  numberOfNights: number;
  priceBeforeTax: number;
  taxPercentage: number;
  taxAmount: number;
  priceAfterTax: number;
  totalPrice: number;
}

export interface HotelDetailsPageProps {
  hotelId: string;
  onBack: () => void;
}
