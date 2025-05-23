import {
  changeBookDetails,
  deleteBook,
  fetchAllBooks,
  fetchBooks,
  insertBook,
} from "../models/books/BookModel.js";

export const createBook = async (req, res, next) => {
  try {
    req.body.thumbnail = req.file ? "image/" + req.file.filename : "";

    const book = await insertBook(req.body);

    book?._id
      ? res.json({
          status: "success",
          message: "book created successfully",
          book,
        })
      : next({
          status: "error",
          message: "error while creating a book",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection:")) {
      return next({
        status: "error",
        message: "Book already exists",
      });
    }

    console.log(error);
    next({
      status: "error",
      message: "Error creating the book",
    });
  }
};

export const updateBook = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.thumbnail = "image/" + req.file.filename;
    } else {
      delete req.body.thumbnail; // Do not overwrite the existing thumbnail if no new file is uploaded
    }
    if (req.body.expectedAvailable === "null") {
      req.body.expectedAvailable = null; // Convert string "null" to JavaScript null
    }
    const updatedBook = await changeBookDetails(req.params.id, req.body);
    res.send({
      status: "success",
      message: "book updated",
      updatedBook,
    });
  } catch (error) {
    console.log(error);
    next({
      status: "error",
      message: "Error updating the book",
    });
  }
};

export const removeBook = async (req, res, next) => {
  try {
    const deletedBook = await deleteBook(req.params.id);
    res.send({
      status: "success",
      message: "book deleted successfully",
      deletedBook,
    });
  } catch (error) {
    next({
      status: "error",
      message: "Error updating the book",
    });
  }
};

export const getBooks = async (req, res, next) => {
  try {
    const { genre, status } = req.query;
    let filterObj = {};

    if (genre) filterObj.genre = genre;
    if (status) filterObj.status = status;

    // Fetch books with the filter object
    const books = await fetchBooks(filterObj);

    res.json({
      status: "success",
      books,
    });
  } catch (error) {
    next({
      status: "error",
      message: "Cannot get books",
    });
  }
};

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await fetchAllBooks();

    res.json({
      status: "success",
      books,
    });
  } catch (error) {
    next({
      status: "error",
      message: "cannot get all books",
    });
  }
};
