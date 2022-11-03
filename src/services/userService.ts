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
