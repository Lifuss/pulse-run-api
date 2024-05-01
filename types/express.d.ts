import { Request } from 'express';
import { Types } from 'mongoose';
import { User as PassportUser } from 'passport';

export interface IUser {
  _id: string;
  email: string;
  password: string;
  roles: string[];
  token: string;
  buyHistory: string[];
  profile: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  avatar: string;
  buyHistory: string[];
  favoriteProducts: string[];
  createdAt: string;
  updatedAt: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}
type User = IUser & PassportUser;

export interface CustomRequest extends Request {
  user?: User;
  headers: {
    authorization?: string;
  };
}
export interface Query {
  'categories.brand': string[];
  'categories.color': string[];
  'categories.size': string[];
  'categories.sex'?: string[];
  'categories.season'?: string[];
  [key: string]: string[] | undefined;
}
export interface ReqQuery {
  page?: string;
  limit?: string;
  sort?: 'createdAt' | 'price';
  order?: 'asc' | 'desc';
  brand?: string;
  color?: string;
  size?: string;
  sex?: string;
  season?: string;
}

export interface TOrder {
  userId?: string;
  products: Array<{
    productId: string;
    quantity: number;
    size: string;
  }>;
  orderDate?: Date;
  deliveryAddress: string;
  deliveryDate: Date;
  paymentMethod: 'card' | 'cash';
  promoCode?: string | Types.ObjectId;
  email: string;
  phone: string;
  name: string;
}
