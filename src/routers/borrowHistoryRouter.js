import express from 'express'
import {authenticate, isAdmin} from "../middlewares/authenticateMiddleware.js"
import { createBorrow, getAllBorrows } from '../controllers/borrowHistoryController.js';
const router = express.Router();


router.post("/", authenticate, createBorrow)


router.get("/",authenticate,isAdmin,getAllBorrows)

// router.put("/return", authenticate, returnBook);

// router.get("/history",authenticate,viewBrowsingHistory)



export default router;