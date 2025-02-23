import express from "express";
import { authenticate } from "../middlewares/authenticateMiddleware.js";
import { postReview } from "../controllers/reviewsController.js";

const router = express.Router();
router.post("", authenticate, postReview);

export default router; 
