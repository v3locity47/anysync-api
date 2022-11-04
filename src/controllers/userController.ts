import { Request, Response } from "express";
import { RequestWithUserInfo } from "../interfaces/userInterface";
import { issueJWT } from "../services/authService";
import * as UserService from "../services/userService";

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
    const { userId, friendUsername } = req.body;
    const user = await UserService.addFriend(userId, friendUsername);
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
