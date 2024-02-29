import { Request } from 'express';
import { User as PassportUser } from 'passport';

type User = IUser & PassportUser;

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
  user?: User;
  headers: {
    authorization?: string;
  };
}
