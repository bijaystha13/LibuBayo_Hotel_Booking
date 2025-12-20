import express from "express";

import { signup } from "../controllers/usersControllers";

const router = express.Router();

router.post("/signup", signup);

export default router;
