import { Types } from 'mongoose';
import { UserModel } from '../models/user.model';
import {
  ICreateUserParams,
  IUser,
  IUserWithSocket,
} from '../interfaces/user.interface';
import { RedisClient } from '../config/redis';
import { isEmpty } from '../utils/general.util';

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

export const setOnlineStatus = async (userId: string, isOnline: boolean) => {
  if (isOnline) {
    await RedisClient.sadd('users:online', userId);
  } else {
    await RedisClient.srem('users:online', userId);
  }
};

export const setUserHash = async (
  userId: string,
  userData: IUserWithSocket
) => {
  await RedisClient.hset(userId, userData);
};

export const removeUserHash = async (userId: string, field: string) => {
  await RedisClient.hdel(userId, field);
};

export const getUserHash = async (userId: string) => {
  const userHash = await RedisClient.hgetall(userId);
  if (isEmpty(userHash)) {
    return null;
  }
  return userHash;
};

export const checkOnlineUsers = async (userIds: Array<string>) => {
  if (isEmpty(userIds)) {
    return {};
  }
  const onlineUsers = await RedisClient.smismember('users:online', userIds);
  const userStatusEntries = userIds.map((_, i) => [
    userIds[i],
    Boolean(onlineUsers[i]),
  ]);
  const userStatus = Object.fromEntries(userStatusEntries);
  return userStatus;
};
