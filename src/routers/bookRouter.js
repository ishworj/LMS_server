import express from "express";
import {
  authenticate,
  isAdmin,
} from "../middlewares/authenticateMiddleware.js";
import {
  createBook,
  getAllBooks,
  getBooks,
  removeBook,
  updateBook,
} from "../controllers/bookController.js";
import {
  createBookValidator,
  updateBookValidator,
} from "../middlewares/joiValidation.js";
const router = express.Router();

router.post("/", authenticate, isAdmin, createBookValidator, createBook);

router.put("/:id", authenticate, isAdmin, updateBookValidator, updateBook);

router.delete("/:id", authenticate, isAdmin, removeBook);

router.get("/pub-books", getBooks);

router.get("/", authenticate, isAdmin, getAllBooks);

export default router;
