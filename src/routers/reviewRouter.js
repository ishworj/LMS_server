import express from "express";

import {
  getAllReviews,
  insertReview,
  updateAReviewById,
} from "../models/reviews/reviewModel.js";
import { authenticate, isAdmin } from "../middlewares/authenticateMiddleware.js";


const router = express.Router();

//Private controllers create new user
// add the call back to review controller
router.post("/", authenticate, async (req, res, next) => {
  try {
    const review = await insertReview(req.body);
    review?._id
      ? res.json({
          status: "success",
          message: "your new review has been added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add the review, try agian later",
        });
  } catch (error) {
    next(error);
  }
});

// return all active reviews only
router.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews({ status: "active" });

    return res.json({
      status: "success",
      message: "",
      reviews,
    });
  } catch (error) {
    next(error);
  }
});

// get all reviews
// return all active reviews only
router.get("/all", authenticate, isAdmin, async (req, res, next) => {
  try {
    const reviews = await getAllReviews({});

    return res.json({
      status: "success",
      message: "",
      reviews,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
