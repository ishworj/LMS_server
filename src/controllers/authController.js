import {
  passwordResetTemplate,
  profileUpdatedTemplate,
  SendMail,
  verifyUserTemplate,
} from "../config/nodemailerConfig.js";
import {
  createNewUser,
  deleteUserById,
  getAllUser,
  getUserByEmail,
  UpdateUser,
} from "../models/users/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptjs.js";
import { jwtSign, refreshJwtSign } from "../utils/jwt.js";
import { v4 as uuidv4 } from "uuid";
import { generaterandom } from "../utils/otpGenerator.js";
import { findToken, getSesssion, insertToken } from "../models/sessions/SessionsSchema.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await getUserByEmail(email);
    if (userData) {
      console.log(userData.isVerified);
      if (!userData.isVerified) {
        return res.json({
          status: "error",
          message: "user is not verified please verify through your email",
        });
      }
      const loginSuccess = await comparePassword(password, userData.password);
      // Creating token and sending as a response
      const tokenData = {
        email: userData.email,
      };

      const token = await jwtSign(tokenData);
      const refreshToken = await refreshJwtSign(tokenData);

      // save the refresh Token in the userData
      const data = await UpdateUser(
        { email: userData.email },
        {
          refreshJWT: refreshToken,
        }
      );
      console.log(userData);
      if (loginSuccess) {
        return res.status(200).json({
          status: "success",
          message: "login succesfull",
          accessToken: token,
          refreshToken: refreshToken,
          user: userData,
        });
      } else {
        next({
          statusCode: 403,
          message: "Credintals unmatched !!!",
        });
      }
    } else {
      next({
        statusCode: 404,
        message: "user not found",
      });
    }
  } catch (error) {
    console.log(error);
    next({
      statusCode: 500,
      message: "login error",
    });
  }
};

export const register = async (req, res, next) => {
  try {
    const { fName, lName, email, phone } = req.body;
    let { password } = req.body;
    password = await hashPassword(password);
    const data = await createNewUser({
      fName,
      lName,
      email,
      password,
      phone,
      verifyToken: uuidv4(),
    });

    if (data) {
      const template = verifyUserTemplate(data.verifyToken, data.email);
      SendMail(template);
    }

    return res.status(201).json({
      status: "success",
      message: "user created",
      data,
    });
  } catch (error) {
    const emsg = error.message;
    if (emsg.includes("E11000 duplicate key error collection:")) {
      return next({
        statusCodE: 400,
        message: "user email already exists",
      });
    }

    next({
      statusCode: 400,
      message: error?.message,
    });
  }
};

export const getUserDetail = async (req, res, next) => {
  try {
    req.userData.password = undefined;
    req.userData.refreshJWT = undefined;
    res.send({
      status: "success",
      message: "user details",
      userData: req.userData,
    });
  } catch (error) {
    next({
      statusCode: 400,
      message: error?.message,
    });
  }
};

export const getAllUserDetail = async (req, res, next) => {
  try {
    const users = await getAllUser();
    res.send({
      status: "success",
      message: "All users fetched ",
      users,
    });
  } catch (error) {
    next({
      statusCode: 400,
      message: error?.message,
    });
  }
};

export const updateUserDetail = async (req, res, next) => {
  req.body.profileImage = req.file ? "image/" + req.file.filename : "";
  try {
    const user = await UpdateUser(
      {
        email: req.userData.email,
      },
      req.body
    );

    if (user) {
      return res.send({
        status: "success",
        message: "profile updated successfully",
        user,
      });
    } else {
      next({
        message: "Error while updating profile",
      });
    }
  } catch (error) {
    next({
      statusCode: 400,
      message: error?.message,
    });
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.json({
      message: "invalidate jwt token code goes here",
    });
  } catch (error) {
    next({
      statusCode: 400,
      message: error?.message,
    });
  }
};

export const renewJwt = async (req, res, next) => {
  // recreate the access Token

  const tokenData = {
    email: req.userData.email,
  };

  const token = await jwtSign(tokenData);

  return res.status(200).json({
    status: "success",
    message: "Token Refreshed",
    accessJWT: token,
  });
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await deleteUserById(id);
    data &&
      res.send({
        status: "success",
        message: "user deleted",
        data,
      });
  } catch (error) {
    next({
      statusCode: 400,
      message: error?.message,
    });
  }
};

export const updateUserByAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UpdateUser(
      {
        _id: id,
      },
      req.body
    );

    if (user) {
      return res.send({
        status: "success",
        message: "profile updated successfully",
        user,
      });
    } else {
      next({
        message: "Error while updating profile",
      });
    }
  } catch (error) {
    next({
      statusCode: 400,
      message: error?.message,
    });
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const verifyToken = req.params.token;
    const user = await UpdateUser(
      { verifyToken: verifyToken },
      { verifyToken: "", isVerified: true }
    );
    user ? (user.password = "") : "";

    if (user) {
      return res.send({
        status: "success",
        message: "user verified , you may login now",
      });
    } else {
      next({
        message: "Error while verifying user",
      });
    }
  } catch (error) {
    console.log(error);
    next({
      statusCode: 400,
      message: error?.message,
    });
  }
};

export const generateOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);

    console.log("Current Time:", new Date());
    console.log("Expiration Time:", new Date(Date.now() + 1000 * 60 * 5));

    if (user?._id) {
      const otp = generaterandom();

      const session = await insertToken({
        token: otp,
        associate: email,
        expire: new Date(Date.now() + 1000 * 60 * 5), // 5min
      });

      if (session?._id) {
        console.log(session);
        const template = passwordResetTemplate(email, user.fName, otp);
        const info = SendMail(template);
        console.log("Message sent: %s", info.messageId);
      }
    }
    res.send({
      status: "success",
      message: "Otp sent to email ",
    });
  } catch (error) {
    next({
      statusCode: 400,
      message: error?.message,
    });
  }
};

export const resetNewPassword = async (req, res, next) => {
  try {
    const { password, email, otp } = req.body;
    const session = await getSesssion(otp,email)

    if (session?._id) {
      // encrypt and update user table

      const hashPass = hashPassword(password);

      const user = await UpdateUser({ email }, { password: hashPass });

      if (user?.id) {
        const template = profileUpdatedTemplate(user.email, user.fName);
        const info = SendMail(template);
        console.log("Message sent: %s", info.messageId);

        return res.json({
          status: "success",
          message:
            "your password has been updated successfully , you may login now",
        });
      }

      next({
        message: "error while reseting password",
      });
    }
  } catch (error) {
    next(error);
  }
};
