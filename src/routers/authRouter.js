import express from "express";
const router = express.Router();
import {
  loginValidator,
  registerValidator,
} from "../middlewares/joiValidation.js";
import { getUserDetail, login, logoutUser, register, renewJwt } from "../controllers/authController.js";
import { authenticate, isAdmin, refreshAuthenticate } from "../middlewares/authenticateMiddleware.js";

//login
router.post("/login", loginValidator, login);
//register
router.post("/register", registerValidator, register);

//get user
router.get("/",authenticate,getUserDetail)

// logout and invalidate jwt 
router.get("/logout",authenticate,logoutUser)

//renew jwt token
router.get("/renew-jwt", refreshAuthenticate, renewJwt);


export default router;
