import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import Bookings from "../models/Bookings";
import HttpError from "../models/httpError";
import Users from "../models/Users";
import Hotels from "../models/Hotels";
import mongoose from "mongoose";

interface BookingModel {
  user: string;
}

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

  const { user, hotel, checkInDate, checkOutDate, guests, price, tax } =
    req.body;

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

    const createdBooking = new Bookings({
      user,
      hotel,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
      price,
      tax,
    });

    await createdBooking.save({ session });

    userExists.bookings.push(createdBooking._id);

    await userExists.save({ session });

    await session.commitTransaction();

    res.status(201).json({ booking: createdBooking });
  } catch {
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
