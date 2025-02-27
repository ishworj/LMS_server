import express from "express";
const router = express.Router();
import {
  loginValidator,
  registerValidator,
} from "../middlewares/joiValidation.js";
import { getUserDetail, login, logoutUser, register, renewJwt } from "../controllers/authController.js";
import { authenticate, isAdmin } from "../middlewares/authenticateMiddleware.js";

//login
router.post("/login", loginValidator, login);
//register
router.post("/register", registerValidator, register);

//get user
router.get("/",authenticate,isAdmin,getUserDetail)

// logout and invalidate jwt 
router.get("/logout",authenticate,logoutUser)

//renew jwt token
router.get("/renew-jwt",authenticate,renewJwt)


export default router;
