import { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    roles: {
      type: [String],
      default: ['user'],
    },
    token: {
      type: String,
      default: null,
    },
    profile: {
      firstName: {
        type: String,
        required: [true, 'First name is required'],
      },
      lastName: {
        type: String,
        required: [true, 'Last name is required'],
      },
      phone: {
        type: String,
        default: '0000000000',
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
  { timestamps: true, versionKey: false },
);

export default userSchema;
