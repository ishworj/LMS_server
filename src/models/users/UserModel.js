import UserSchema from "./UserSchema.js";

//Register user
export const createNewUser = (userObj) => {
  return UserSchema(userObj).save();
};
//read user
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};
//update user
export const UpdateUser = (filter, updatedUserObject) => {
  return UserSchema.findOneAndUpdate(filter, updatedUserObject, { new: true });
};
//delete user
export const deleteUserById = (_id) => {
  console.log(_id)
  return UserSchema.findByIdAndDelete(_id);
};

// get all user
export const getAllUser = () => {
  return UserSchema.find({});
};
