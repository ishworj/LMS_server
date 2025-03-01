import BorrowHistorySchema from "./BorrowHistorySchema.js";

export const insertBorrowHistory = (borrowObj) => {
  return BorrowHistorySchema(borrowObj).save();
};

export const updateBorrowHistory = (id, borrowObj) => {
  return BorrowHistorySchema.findByIdAndUpdate(id, borrowObj, { new: true });
};

export const deleteBorrowHistory = (id) => {
  return BorrowHistorySchema.findByIdAndDelete(id);
};

export const fetchBorrowHistory = (filterObj) => {
  return BorrowHistorySchema.find(filterObj).populate("userId bookId reviewId");
};

export const fetchAllBorrowHistories = () => {
  return BorrowHistorySchema.find({}).populate("userId bookId reviewId");
};
