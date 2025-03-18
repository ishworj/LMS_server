import mongoose from "mongoose";

const BorrowHistorySchema = new mongoose.Schema(
  {
    userId: {
      //patload
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    bookId: {
      //payload
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
      enum: ["borrowed", "returned", "reviewed"],
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
    title: {
      //payload
      type: String,
      required: true,
    },
    thumbnail: {
      //payload
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BorrowHistory", BorrowHistorySchema);
