import {
  createNewUser,
  deleteUserById,
  getAllUser,
  getUserByEmail,
  UpdateUser,
} from "../models/users/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptjs.js";
import { jwtSign, refreshJwtSign } from "../utils/jwt.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await getUserByEmail(email);
    if (userData) {
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
          user: {
            _id: userData._id,
            fName: userData.fName,
            lName: userData.lName,
          },
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

    // creating
    const data = await createNewUser({
      fName,
      lName,
      email,
      password,
      phone,
    });

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
        data
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
         _id:id
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
