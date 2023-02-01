import { Types } from 'mongoose';
import { Request } from 'express';

export interface IUser {
  readonly _id?: string & Types.ObjectId;
  oauthId: string;
  authProvider: string;
  email: string;
  firstName: string;
  lastName: string;
  username?: string;
  friends?: Array<string> & Array<Types.ObjectId> & Array<IUser>;
  createdAt?: string;
  updateAt?: string;
}

export interface IUserWithSocket extends IUser {
  socketId: string;
}

export interface IGoogleProfile {
  provider: string;
  sub: string;
  id: string;
  displayName: string;
  given_name: string;
  family_name: string;
  email_verified: boolean;
  verified: boolean;
  language: string;
  email: string;
  picture: string;
  [otherProperties: string]: unknown;
}

export interface ICreateUserParams {
  uniqueKey: string;
  value: string | Types.ObjectId;
  userProfile?: IGoogleProfile;
}

export interface RequestWithUserInfo extends Request {
  user: IUser;
}
