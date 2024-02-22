import { Request } from 'express';

export interface IUser {
  _id: string;
  email: string;
  password: string;
  roles: string[];
  token: string;
  profile: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  buyHistory: string[];
  favoriteProducts: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomRequest extends Request {
  user?: IUser;
  headers: {
    authorization?: string;
  };
}
