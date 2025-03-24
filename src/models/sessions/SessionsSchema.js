import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    associate: {
      type: String,
      default: "",
    },
    expire: {
      type: Date,
      required: true,
      default: new Date(Date.now() + 36000000000),
      expires: 0,
    },
  },
  {
    timestamps: true,
  }
);

const SessionSchema = mongoose.model("Session", sessionSchema);

//just to show that we can write bot schema and model in the same file
//Queries

export const insertToken = (obj) => {
  return SessionSchema(obj).save();
};

export const findToken = (token) => {
  return SessionSchema.findOne({ token, email });
};

export const getSesssion = (otp, email) => {
  return SessionSchema.findOne({ token: otp, associate: email });
};
