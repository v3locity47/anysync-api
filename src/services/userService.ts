import { UserModel } from "../models/userModel";
import { ICreateUserParams, IUser } from "../interfaces/userInterface";

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
  userId: string,
  friendUsername: string
): Promise<IUser> => {
  const { _id: friendId } = await UserModel.findOne({
    username: friendUsername,
  }).lean();
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
