import express from 'express'
import {authenticate, isAdmin} from "../middlewares/authenticateMiddleware.js"
import { createBorrow, getAllBorrows, returnBook, viewBorrowDetails } from '../controllers/borrowHistoryController.js';
const router = express.Router();


router.post("/", authenticate, createBorrow)

// get all borrow history 
router.get("/",authenticate,isAdmin,getAllBorrows)

router.put("/return", authenticate, returnBook);
//individault borrow list 
router.get("/history",authenticate,viewBorrowDetails)



export default router;