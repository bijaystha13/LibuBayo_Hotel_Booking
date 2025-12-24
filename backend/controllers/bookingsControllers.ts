import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Bookings from "../models/Bookings";
import HttpError from "../models/httpError";
import Users from "../models/Users";
import Hotels from "../models/Hotels";
import mongoose from "mongoose";

export async function createBooking(
  req: Request<Record<string, never>>,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { user, hotel, checkInDate, checkOutDate, guests, tax } = req.body;
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (checkOut <= checkIn) {
    return next(
      new HttpError("Check-out date must be after check-in date", 422)
    );
  }

  if (checkIn < new Date()) {
    return next(new HttpError("Check-in date cannot be in the past", 422));
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userExists = await Users.findById(user);
    if (!userExists) {
      await session.abortTransaction();
      return next(new HttpError("User not found", 404));
    }

    const hotelExists = await Hotels.findById(hotel);
    if (!hotelExists) {
      await session.abortTransaction();
      return next(new HttpError("Hotel not found", 404));
    }

    const overlappingBooking = await Bookings.findOne({
      hotel,
      status: { $ne: "cancelled" },
      $or: [
        {
          checkInDate: { $lte: checkOut },
          checkOutDate: { $gte: checkIn },
        },
      ],
    });

    if (overlappingBooking) {
      await session.abortTransaction();
      return next(
        new HttpError("Hotel is not available for the selected dates", 409)
      );
    }

    // Calculate price breakdown
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
    const pricePerNight = hotelExists.pricePerNight;
    const priceBeforeTax = pricePerNight * nights;
    const taxPercentage = tax || 10;
    const taxAmount = (priceBeforeTax * taxPercentage) / 100;
    const priceAfterTax = priceBeforeTax + taxAmount;

    const createdBooking = new Bookings({
      user,
      hotel,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,

      // New detailed price fields
      pricePerNight: pricePerNight,
      numberOfNights: nights,
      priceBeforeTax: priceBeforeTax,
      taxPercentage: taxPercentage,
      taxAmount: taxAmount,
      priceAfterTax: priceAfterTax,

      // Keep for backwards compatibility
      price: priceBeforeTax,
      tax: taxPercentage,
    });

    await createdBooking.save({ session });

    userExists.bookings.push(createdBooking._id as mongoose.Types.ObjectId);
    await userExists.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      booking: createdBooking,
      priceBreakdown: {
        pricePerNight: pricePerNight,
        numberOfNights: nights,
        priceBeforeTax: priceBeforeTax,
        taxPercentage: taxPercentage,
        taxAmount: taxAmount,
        priceAfterTax: priceAfterTax,
        totalPrice: createdBooking.totalPrice,
      },
    });
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    const error = new HttpError(
      "Booking hotel failed, please try again later",
      500
    );
    return next(error);
  } finally {
    session.endSession();
  }
}

export async function getBookingByUserId(
  req: Request<Record<string, never>>,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.bid;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new HttpError("Invalid user id", 400));
  }

  let bookings;

  try {
    // bookings = await Bookings.find({ user: userId }).populate("hotel");
    bookings = await Bookings.find({ user: userId }).populate({
      path: "hotel",
      select: "name type image pricePerNight",
    });
  } catch {
    const error = new HttpError(
      "Fetching bookings failed, please try again later",
      500
    );
    return next(error);
  }

  if (!bookings || bookings.length === 0) {
    return next(
      new HttpError("Could not find the bookings for the provided user id", 404)
    );
  }

  res.json({
    bookings: bookings.map((booking) => booking.toObject({ getters: true })),
  });
}
