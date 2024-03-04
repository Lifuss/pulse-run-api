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
  avatar: string;
  buyHistory: string[];
  favoriteProducts: string[];
  createdAt: string;
  updatedAt: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

export interface CustomRequest extends Request {
  user?: User;
  headers: {
    authorization?: string;
  };
}
