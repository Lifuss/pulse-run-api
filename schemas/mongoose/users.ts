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
    buyHistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
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
    avatar: {
      type: String,
      default: '',
    },
    payment: [
      {
        cardNumber: {
          type: String,
          default: '',
        },
        cardName: {
          type: String,
          default: '',
        },
        cardDate: {
          type: String,
          default: '',
        },
        cardCVC: {
          type: String,
          default: '',
        },
      },
    ],
    favoriteProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false },
);

export default userSchema;
