import express from "express";
const router = express.Router();
import {
  loginValidator,
  passwordResetValidator,
  registerValidator,
} from "../middlewares/joiValidation.js";
import {
  deleteUser,
  generateOTP,
  getAllUserDetail,
  getUserDetail,
  login,
  logoutUser,
  register,
  renewJwt,
  resetNewPassword,
  updateUserByAdmin,
  updateUserDetail,
  verifyUser,
} from "../controllers/authController.js";
import {
  authenticate,
  isAdmin,
  refreshAuthenticate,
} from "../middlewares/authenticateMiddleware.js";
import { upload } from "../config/multerConfig.js";

//login
router.post("/login", loginValidator, login);
//register
router.post("/register", registerValidator, register);

//get user
router.get("/", authenticate, getUserDetail);

// get all user by admin
router.get("/all", authenticate, isAdmin, getAllUserDetail);

// update user
router.put("/", authenticate, upload.single("profileFile"), updateUserDetail);

// logout and invalidate jwt
router.get("/logout", authenticate, logoutUser);

//renew jwt token
router.get("/renew-jwt", refreshAuthenticate, renewJwt);

// delete user by admin

router.delete("/:id", authenticate, isAdmin, deleteUser);

router.put("/:id", authenticate, isAdmin, updateUserByAdmin);

router.get("/verify/:token", verifyUser);

router.post("/otp",  generateOTP);

router.post("/reset-password",passwordResetValidator, resetNewPassword);


export default router;
