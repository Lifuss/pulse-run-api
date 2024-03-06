import { Request } from 'express';
import { User as PassportUser } from 'passport';

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
