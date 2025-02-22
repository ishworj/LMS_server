import {
  borrowingBook,
  browseHistory,
  browseHistoryofAll,
  returningBook,
} from "../models/borrowHistory/BorrowHistoryModel.js";

export const borrowBook = async (req, res, next) => {
  try {
    const userId = req.userData._id;

    const borrowHistory = await borrowingBook({ userId, ...req.body });

    res.json({
      status: "success",
      message: "book borrowed successfully",
      borrowHistory,
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("E11000 duplicate key error collection:")) {
      return next({
        status: "error",
        message: "Book already borrowed",
      });
    }
    next({
      status: "error",
      message: "Error borrowing the book",
    });
  }
};

export const returnBook = async (req, res, next) => {
  try {
    const userId = req.userData._id;
    const { bookId, ...borrowObj } = req.body;
    console.log(borrowObj);
    const returnedBook = await returningBook({ userId, bookId }, borrowObj);

    res.json({
      status: "success",
      message: "book returned successfully",
      returnedBook,
    });
  } catch (error) {
    console.log(error);
    next({
      status: "error",
      message: "Error while returning the book",
    });
  }
};

export const viewBrowsingHistory = async (req, res, next) => {
  try {
    const { _id, role } = req.userData;
    const browsedHistory =
      role === "admin" ? await browseHistoryofAll() : await browseHistory(_id);

    res.json({
      status: "success",
      message: "browsing history here successfully",
      browsedHistory,
    });
  } catch (error) {
    console.log(error);
    next({
      status: "error",
      message: "Error while getting browsing history",
    });
  }
};
