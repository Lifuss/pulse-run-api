import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    roles: {
      type: [String],
      required: true,
    },
    profile: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    // TODO: buyHistory and favoriteProducts should be ref to Product model
    buyHistory: {
      type: [String],
    },
    favoriteProducts: {
      type: [String],
    },
  },
  { timestamps: true, versionKey: false }
);

export default userSchema;
