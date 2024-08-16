import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      minlength: [3, "Name must be at least 3 characters long!"],
      maxlength: [50, "Name cannot be more than 50 characters long!"],
      match: /^[a-zA-Z\s]+$/,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: [true, "Email address is already in use!"],
      required: [true, "Email address is required!"],
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address!",
        // ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
        // ^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}$
      ],
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
