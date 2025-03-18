import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: "string",
      required: true,
    },
    lName: {
      type: "string",
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "student"],
      default: "student",
    },
    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    phone:{
      type:Number
    },
    password: {
      type: String,
      required: true,
    },
    refreshJWT: {
      type: String,
      default: "",
    },
    isVerified :{
      type:Boolean,
      default: false
    },
    verifyToken:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
