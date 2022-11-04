import { Types } from 'mongoose';
import { UserModel } from '../models/user.model';
import { ICreateUserParams, IUser } from '../interfaces/user.interface';

export const findOrCreate = async (
  params: ICreateUserParams
): Promise<IUser> => {
  const { uniqueKey, value, userProfile } = params;
  const user = await UserModel.findOne({ [uniqueKey]: value }).lean();
  if (user) {
    return user;
  }
  const userData: IUser = {
    firstName: userProfile.given_name,
    lastName: userProfile.family_name,
    email: userProfile.email,
    oauthId: userProfile.id,
    authProvider: userProfile.provider,
  };

  const newUser = await UserModel.create(userData);

  return newUser;
};

export const addFriend = async (
  userId: Types.ObjectId,
  friendId: Types.ObjectId
): Promise<IUser> => {
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { friends: friendId } },
    { new: true }
  ).lean();
  return updatedUser;
};

export const editProfile = async (
  userId: string,
  username: string
): Promise<IUser> => {
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: userId },
    { username: username },
    { new: true, upsert: true }
  );
  return updatedUser;
};