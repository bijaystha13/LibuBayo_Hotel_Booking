// import mongoose from "mongoose";
// import uniqueValidator from "mongoose-unique-validator";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//     role: { type: String, default: "user", enum: ["user", "admin"] },
//   },
//   { timestamps: true }
// );

// userSchema.plugin(uniqueValidator);

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    bookings: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Booking" },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
