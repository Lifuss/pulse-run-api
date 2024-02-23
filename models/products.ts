import { model } from 'mongoose';
import {
  brandSchema,
  colorSchema,
  productSchema,
  sizeSchema,
} from '../schemas/mongoose/products';

const Product = model('Product', productSchema);
const Brand = model('Brand', brandSchema);
const Color = model('Color', colorSchema);
const Size = model('Size', sizeSchema);

export { Product, Brand, Color, Size };
