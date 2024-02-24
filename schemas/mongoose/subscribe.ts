import { Schema } from 'mongoose';

const subscribeSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export default subscribeSchema;
