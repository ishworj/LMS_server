import { findToken } from "../models/sessions/SessionsSchema.js"
import { getUserByEmail } from "../models/users/UserModel.js";
import { jwtVerify, refreshJwtVerify } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const tokenFromDb = await findToken(token);

    const decodedData = await jwtVerify(tokenFromDb.token);

    if (decodedData?.email) {
      const userData = await getUserByEmail(decodedData.email);

      if (userData) {
        req.userData = userData;
        next();
      } else {
        return res.status(404).json({
          status: "error",
          message: "user not found",
        });
      }
    } else {
      return res.status(401).json({
        status: "error",
        message: "No payload",
      });
    }
  } catch (error) {
    return res.status(401).send({
      status: "error",
      message: "Authentication failledddd",
      errormsg: error.message,
    });
  }
};

export const refreshAuthenticate = async (req, res, next) => {
  try {
    // 1. get the token
    const token = req.headers.authorization;
    // 2. verify the token
    const decodedData = await refreshJwtVerify(token);
    console.log("DECODED", decodedData);

    if (decodedData?.email) {
      // 3. find the user from the decoded data
      const userData = await getUserByEmail(decodedData.email);

      // extra check check if userData exists and check if the token is available in database

      if (userData && userData.refreshJWT == token) {
        //3.1 add user data to request
        req.userData = userData;

        // 4. go and do the next process
        next();
      } else {
        const errorObj = {
          statusCode: 400,
          message: "Authetication Failed!",
        };

        // next(errorObj);
        return res.send({
          status: "error",
          message: "Error Authenticating",
        });
      }
    } else {
      const errorObj = {
        statusCode: 401,
        message: "Invalid Token",
      };

      next(errorObj);
    }
  } catch (error) {
    console.log("VERIFYJWT", error);
    const errorObj = {
      statusCode: 401,
      message: "Error Validating Token",
    };

    next(errorObj);
  }
};

export const isAdmin = (req, res, next) => {
  req.userData.role === "admin"
    ? next()
    : next({
        statusCode: "401",
        message: "not a authorized user",
      });
};
