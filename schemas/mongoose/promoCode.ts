import { Schema } from 'mongoose';

export const promoCodeSchema = new Schema(
  {
    code: { type: String, required: true },
    discount: { type: Number, required: true },
    expireDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    usedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true, versionKey: false },
);
