import express from "express";
import { check } from "express-validator";

import {
  createBooking,
  getBookingByUserId,
} from "../controllers/bookingsControllers";

const router = express.Router();

router.post(
  "/",
  [
    check("user").not().isEmpty(),
    check("hotel").not().isEmpty(),
    check("checkInDate").not().isEmpty(),
    check("checkOutDate").not().isEmpty(),
    check("guests").isInt({ min: 1 }),
  ],
  createBooking
);

router.get("/:bid", getBookingByUserId);

export default router;
