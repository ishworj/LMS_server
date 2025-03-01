import ReviewsSchema from "./ReviewSchema.js";

export const insertReview = (reviewObj) => {
  return ReviewsSchema(reviewObj).save();
};

export const updateReview = (id, reviewObj) => {
  return ReviewsSchema.findByIdAndUpdate(id, reviewObj, { new: true });
};

export const deleteReview = (id) => {
  return ReviewsSchema.findByIdAndDelete(id);
};

export const fetchReviews = (filterObj) => {
  return ReviewsSchema.find(filterObj).populate("userId bookId");
};

export const fetchAllReviews = () => {
  return ReviewsSchema.find({}).populate("userId bookId");
};
