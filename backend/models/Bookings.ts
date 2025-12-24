// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//     hotel: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "Hotel",
//     },
//     checkInDate: { type: Date, required: true },
//     checkOutDate: { type: Date, required: true },
//     guests: { type: Number, required: true, min: 1 },
//     price: { type: Number, required: true },
//     tax: {
//       type: Number,
//       default: 10,
//     },
//     totalPrice: {
//       type: Number,
//       //   required: true,
//     },
//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "cancelled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// bookingSchema.pre("save", function (next) {
//   if (this.price != null && this.tax != null) {
//     this.totalPrice = this.price + (this.price * this.tax) / 100;
//   }
//   next();
// });

// export default mongoose.model("Booking", bookingSchema);

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Hotel",
    },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1 },

    pricePerNight: { type: Number, required: true },
    numberOfNights: { type: Number, required: true },
    priceBeforeTax: { type: Number, required: true },
    taxPercentage: { type: Number, default: 10 },
    taxAmount: { type: Number },
    priceAfterTax: { type: Number },

    price: { type: Number, required: true },
    tax: { type: Number, default: 10 },
    totalPrice: { type: Number },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Pre-save hook to ensure totalPrice is calculated
bookingSchema.pre("save", function (next) {
  if (this.priceBeforeTax != null && this.taxAmount != null) {
    this.totalPrice = this.priceBeforeTax + this.taxAmount;
    this.priceAfterTax = this.totalPrice;
  }
  next();
});

export default mongoose.model("Booking", bookingSchema);
