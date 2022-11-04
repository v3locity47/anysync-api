import { Request, Response } from 'express';
import { RequestWithUserInfo } from '../interfaces/user.interface';
import { issueJWT } from '../services/auth.service';
import * as UserService from '../services/user.service';

export const signInSuccess = (req: RequestWithUserInfo, res: Response) => {
  try {
    const user = req.user;
    const JWT = issueJWT(user._id);
    res.status(200).json({ user, ...JWT });
  } catch (err) {
    const error = { message: err };
    res.status(500).json(error);
  }
};

export const addFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.body;
    const user = await UserService.addFriend(userId, friendId);
    res.status(200).json(user);
  } catch (err) {
    const error = { message: `${err}` };
    res.status(500).json(error);
  }
};

export const editProfile = async (req: Request, res: Response) => {
  try {
    const { userId, username } = req.body;
    const user = await UserService.editProfile(userId, username);
    res.status(200).json(user);
  } catch (err) {
    const error = { message: `${err}` };
    res.status(500).json(error);
  }
};
