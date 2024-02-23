import { Schema } from 'mongoose';

export const productSchema = new Schema({
  name: String,
  price: Number,
  category: {
    season: {
      type: String,
      enum: ['winter', 'summer', 'all-season'],
      required: true,
    },
    size: { type: Schema.Types.ObjectId, ref: 'Size', required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    color: { type: Schema.Types.ObjectId, ref: 'Color', required: true },
  },
  description: String,
  imgThumbnail: String,
});

export const sizeSchema = new Schema({
  name: {
    type: Number,
    enum: [
      36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43,
      43.5, 44, 44.5, 45, 45.5, 46, 46.5, 47, 47.5, 48, 48.5, 49, 49.5, 50,
    ],
    required: true,
  },
});

export const brandSchema = new Schema({
  name: {
    type: String,
    enum: ['nike', 'adidas', 'puma', 'reebok', 'new balance'],
    required: true,
  },
});

export const colorSchema = new Schema({
  name: {
    type: String,
    enum: ['red', 'blue', 'green', 'yellow', 'black', 'white', 'gray'],
    required: true,
  },
});
