export const postReview = async (req, res, next) => {
  try {
    const review = await giveReview(req.body);

    review?._id
      ? res.json({
          status: "success",
          message: "book reviewed successfully",
          review,
        })
      : next({
          status: "error",
          message: "error while reviewing a book",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection:")) {
      return next({
        status: "error",
        message: "already reviewed",
      });
    }
    next({
      status: "error",
      message: "Error while reviewing the book",
    });
  }
};
