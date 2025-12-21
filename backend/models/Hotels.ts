import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: String,
    location: {
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    pricePerNight: { type: Number, required: true },
    originalPrice: Number,
    amenities: [String],
    featured: { type: Boolean, default: false },
    image: [String],
    distance: String,
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema);
