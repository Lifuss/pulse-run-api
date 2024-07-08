import { Schema } from 'mongoose';

export const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        priceByOne: { type: Number, required: true },
        sizeId: { type: Schema.Types.ObjectId, ref: 'Size' },
      },
    ],
    orderDate: { type: Date, default: Date.now },
    priceSum: { type: Number, required: true },
    deliveryAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'pending' },
    promoCode: { type: Schema.Types.ObjectId, ref: 'PromoCode', default: null },
    discount: { type: Number },
    email: { type: String },
    phone: { type: String },
    name: { type: String },
  },
  { timestamps: true, versionKey: false },
);
