import mongoose from "mongoose";

export const connectDb = async () => {
  return await mongoose.connect(process.env.MONGO_URL);
};
