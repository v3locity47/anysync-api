import { Request, Response } from "express";

export const signInSuccess = (req: Request, res: Response) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    const error = { Error: err };
    res.status(500).json(error);
  }
};
