import { Schema } from 'mongoose';
import { seasonsArr, sexArr } from '../../utils/constants';

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
        enum: sexArr,
      },
      season: {
        type: String,
        enum: seasonsArr,
        required: true,
      },

      size: [{ type: Schema.Types.ObjectId, ref: 'Size', required: true }],
      brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
      color: [{ type: Schema.Types.ObjectId, ref: 'Color', required: true }],
    },
  },
  { timestamps: true, versionKey: false },
);

export const sizeSchema = new Schema(
  {
    value: Number,
  },
  { versionKey: false },
);

export const brandSchema = new Schema(
  {
    name: String,
  },
  { versionKey: false },
);

export const colorSchema = new Schema(
  {
    name: String,
  },
  { versionKey: false },
);
