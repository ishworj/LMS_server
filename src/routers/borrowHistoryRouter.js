import express from 'express'
import {authenticate} from "../middlewares/authenticateMiddleware.js"
import { createBorrow } from '../controllers/borrowHistoryController.js';
const router = express.Router();


router.post("/", authenticate, createBorrow)

// router.put("/return", authenticate, returnBook);

// router.get("/history",authenticate,viewBrowsingHistory)



export default router;