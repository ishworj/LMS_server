import { getUserByEmail } from "../models/users/UserModel.js";
import { jwtVerify } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const decodedData = await jwtVerify(token);

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
      message: "Authentication failled",
      errormsg: error.message,
    });
  }
};



export const isAdmin = (req,res,next)=>{
    req.userData.role === "admin"
      ? next()
      : next({
          statusCode: "401",
          message: "not a authorized user",
        });
}
