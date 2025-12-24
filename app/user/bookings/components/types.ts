export interface Booking {
  id: string;
  roomName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "upcoming" | "completed" | "cancelled";
  roomEmoji: string;
  bookingDate: string;
  hotelImages?: string[];
}

export interface ApiBooking {
  _id: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  status: "pending" | "confirmed" | "cancelled";
  priceAfterTax?: number;
  totalPrice?: number;
  createdAt: string;
  hotel?: {
    name?: string;
    type?: string;
    image?: string[];
  };
}
