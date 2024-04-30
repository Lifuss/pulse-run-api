import { Schema } from 'mongoose';

export const promoCodeSchema = new Schema({
  code: { type: String, required: true },
  discount: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});
