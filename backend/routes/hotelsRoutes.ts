import express from "express";
import { getAllHotels } from "../controllers/hotelsControllers";

const router = express.Router();

router.get("/", getAllHotels);

export default router;
