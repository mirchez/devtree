import mongoose, { Schema } from "mongoose";

interface IUser {
  handle: String;
  name: String;
  email: String;
  password: String;
}

const userSchema = new Schema({
  handle: {
    type: String,
    require: true,
    trim: true,
    lowecase: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    lowecase: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
