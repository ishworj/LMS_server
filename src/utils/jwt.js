import jwt from "jsonwebtoken";
import { insertToken } from "../models/sessions/SessionsSchema.js";

export const jwtSign = (signData) => {
  const token = jwt.sign(signData, process.env.JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: process.env.JWT_EXPRIES_IN,
  });
  // insert token to database for sessions
  insertToken({ token });
  return token;
};

export const jwtVerify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

export const refreshJwtSign = async (signData) => {
  return jwt.sign(signData, process.env.REFRESH_JWT_SECRET, {
    expiresIn: process.env.REFRESH_JWT_EXPIRESIN,
  });
};

export const refreshJwtVerify = async (token) => {
  return jwt.verify(token, process.env.REFRESH_JWT_SECRET);
};
