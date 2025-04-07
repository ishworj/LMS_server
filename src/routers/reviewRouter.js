import express from "express";

import {
  deleteAReviewById,
  getAllReviews,
  insertReview,
  updateAReviewById,
} from "../models/reviews/ReviewModel.js";
import { authenticate, isAdmin } from "../middlewares/authenticateMiddleware.js";
import { returningBook } from "../models/borrowHistory/BorrowHistoryModel.js";


const router = express.Router();
router.post("/", authenticate, async (req, res, next) => {
  try {
    const review = await insertReview(req.body);
    const _id = req.body.burrowId;
    const updatetoReveiwed = await returningBook({_id},{status:"reviewed"})
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


//update status
router.patch("/", authenticate, isAdmin, async (req, res, next) => {
  try {
    const { _id, status } = req.body;
    const review = await updateAReviewById(_id, { status });
    review?._id
      ? res.json({
          status: "success",
          message: "The review has been updated successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to update the review, try agian later",
        });
  } catch (error) {
    next(error);
  }
});

//update status
router.delete("/:id", authenticate, isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const reviewDeleted = await deleteAReviewById(id);
    reviewDeleted?._id
      ? res.json({
          status: "success",
          message: "The review has been deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to delete the review, try agian later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
