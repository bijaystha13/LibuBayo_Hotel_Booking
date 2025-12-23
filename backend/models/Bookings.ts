import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    hotel: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Hotel",
    },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

bookingSchema.pre("save", function (next) {
  if (this.price != null && this.tax != null) {
    this.totalPrice = this.price + (this.price * this.tax) / 100;
  }
  next();
});

export default mongoose.model("Booking", bookingSchema);
