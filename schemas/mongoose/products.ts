import { Schema } from 'mongoose';

export const productSchema = new Schema(
  {
    name: String,
    price: Number,
    sale: { type: Number, default: 0 },
    description: String,
    imgThumbnail: String,
    imgGallery: [String],
    features: [String],
    categories: {
      sex: {
        type: String,
        enum: ['male', 'female', 'unisex'],
      },
      season: {
        type: String,
        enum: ['winter', 'summer', 'all-season'],
        required: true,
      },

      size: { type: Schema.Types.ObjectId, ref: 'Size', required: true },
      brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
      color: { type: Schema.Types.ObjectId, ref: 'Color', required: true },
    },
  },
  { timestamps: true, versionKey: false },
);

export const sizeSchema = new Schema(
  {
    size: Number,
  },
  { versionKey: false },
);

export const brandSchema = new Schema(
  {
    brand: String,
  },
  { versionKey: false },
);

export const colorSchema = new Schema(
  {
    color: String,
  },
  { versionKey: false },
);
