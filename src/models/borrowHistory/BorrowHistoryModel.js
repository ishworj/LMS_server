import BorrowHistorySchema from "./BorrowHistorySchema.js";

export const createBorrowdb = (borrowObj) => {
  return BorrowHistorySchema(borrowObj).save();
};

export const getAllBorrowsDB = () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return BorrowHistorySchema.find({
    borrowDate: { $gte: thirtyDaysAgo },
  });
};



export const getUserBorrowDB = (id) => {
  return BorrowHistorySchema.find({userId:id});}

export const returningBook = (filterObj,borrowObj) => {
  return BorrowHistorySchema.findOneAndUpdate(filterObj,borrowObj)
};

// export const updateBorrowHistory = (id, borrowObj) => {
//   return BorrowHistorySchema.findByIdAndUpdate(id, borrowObj, { new: true });
// };

// export const deleteBorrowHistory = (id) => {
//   return BorrowHistorySchema.findByIdAndDelete(id);
// };

// export const fetchBorrowHistory = (filterObj) => {
//   return BorrowHistorySchema.find(filterObj).populate("userId bookId reviewId");
// };

// export const fetchAllBorrowHistories = () => {
//   return BorrowHistorySchema.find({}).populate("userId bookId reviewId");
// };
