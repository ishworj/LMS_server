import { changeBookDetails } from "../models/books/BookModel.js";
import {
  createBorrowdb,
  getAllBorrowsDB,
  getUserBorrowDB,
  returningBook,
} from "../models/borrowHistory/BorrowHistoryModel.js";
import { updateBook } from "./bookController.js";

export const createBorrow = async (req, res, next) => {
  try {
    const userId = req.userData._id;
    const { bookId, title, thumbnail } = req.body;
    // dur time =  days
    const BURROWINGDAYS = 15;
    const today = new Date();
    const dueDate = today.setDate(today.getDate() + BURROWINGDAYS, "day");

    const borrowObj = {
      userId,
      bookId,
      dueDate,
      title,
      thumbnail,
    };
    const data = await createBorrowdb(borrowObj);

    if (data) {
      const bookData = await changeBookDetails(bookId, {
        isAvailable: false,
        expectedAvailable: dueDate,
      });
    }

    res.status(201).json({
      status: "success",
      message: "book borrowed successfully",
      data,
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
    const bookId = req.body.bookId;
    const _id = req.body.id;

    console.log(_id, userId, bookId);
    console.log(req.body);

    const returnedBook = await returningBook(
      { _id, userId, bookId },
      { status: "returned", returnDate: new Date() }
    );

    const bookUpdated = await changeBookDetails(bookId, {
      isAvailable: true,
      expectedAvailable: null,
    });

    returnBook &&
      bookUpdated &&
      res.json({
        status: "success",
        message: "Book returned and updated successfully",
        returnBook,
        bookUpdated,
      });
  } catch (error) {
    console.log(error);
    next({
      status: "error",
      message: "Error while returning the book",
    });
  }
};

// export const viewBrowsingHistory = async (req, res, next) => {
//   try {
//     const { _id, role } = req.userData;
//     const browsedHistory =
//       role === "admin" ? await browseHistoryofAll() : await browseHistory(_id);

//     res.json({
//       status: "success",
//       message: "browsing history here successfully",
//       browsedHistory,
//     });
//   } catch (error) {
//     console.log(error);
//     next({
//       status: "error",
//       message: "Error while getting browsing history",
//     });
//   }
// };

export const getAllBorrows = async (req, res, next) => {
  try {
    const allBorrows = await getAllBorrowsDB();
    res.json({
      status: "success",
      message: "borrows fetched successfully",
      allBorrows,
    });
  } catch (error) {
    next({
      status: "error",
      message: "Errorfetching borrow history",
    });
  }
};

export const viewBorrowDetails = async (req, res, next) => {
  try {
    const borrows = await getUserBorrowDB(req.userData._id);
    res.json({
      status: "success",
      message: "borrows fetched successfully",
      borrows,
    });
  } catch (error) {
    next({
      status: "error",
      message: "Error fetching borrow history lidst",
    });
  }
};
