import { Request, Response } from 'express';
import { RequestWithUserInfo } from '../interfaces/user.interface';
import * as UserService from '../services/user.service';

export const signInSuccess = (req: RequestWithUserInfo, res: Response) => {
  try {
    const user = req.user;
    res.redirect(req.session.redirectUrl);
    // res.status(200).json({ user, ...JWT });
  } catch (err) {
    const error = { message: err };
    res.status(500).json(error);
  }
};

export const addFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.body;
    console.log(req.user);
    console.log(req.session);
    console.log(`YES2: ${req.isAuthenticated()}`);
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
