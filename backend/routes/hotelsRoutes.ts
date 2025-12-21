import express from "express";
import { getAllHotels, getHotelById } from "../controllers/hotelsControllers";

const router = express.Router();

router.get("/", getAllHotels);
router.get("/:id", getHotelById);

export default router;
