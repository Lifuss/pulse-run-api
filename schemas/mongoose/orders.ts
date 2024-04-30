import { Schema } from 'mongoose';

export const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
      size: { type: Schema.Types.ObjectId, ref: 'Size' },
    },
  ],
  orderDate: { type: Date, default: Date.now },
  deliveryAddress: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: 'pending' },
  promoCode: { type: Schema.Types.ObjectId, ref: 'PromoCode' },
  email: { type: String },
  phone: { type: String },
  name: { type: String },
});
