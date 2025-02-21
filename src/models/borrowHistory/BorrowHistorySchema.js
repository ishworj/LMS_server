import mongoose from "mongoose";

const BorrowHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },
    borrowDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
    isReviewed: {
      type: Boolean,
      default: false,
    },
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  },
  { timestamps: true }
);

export default mongoose.model("BorrowHistory", BorrowHistorySchema);
