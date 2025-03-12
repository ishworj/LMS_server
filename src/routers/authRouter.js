import express from "express";
const router = express.Router();
import {
  loginValidator,
  registerValidator,
} from "../middlewares/joiValidation.js";
import { getAllUserDetail, getUserDetail, login, logoutUser, register, renewJwt, updateUserDetail } from "../controllers/authController.js";
import { authenticate, isAdmin, refreshAuthenticate } from "../middlewares/authenticateMiddleware.js";

//login
router.post("/login", loginValidator, login);
//register
router.post("/register", registerValidator, register);

//get user
router.get("/",authenticate,getUserDetail)

// get all user by admin
router.get("/all", authenticate,isAdmin, getAllUserDetail);

// update user 
router.put("/",authenticate,updateUserDetail)

// logout and invalidate jwt 
router.get("/logout",authenticate,logoutUser)

//renew jwt token
router.get("/renew-jwt", refreshAuthenticate, renewJwt);


export default router;
