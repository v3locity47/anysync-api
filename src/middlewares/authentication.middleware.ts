import { Request, Response, NextFunction } from 'express';

export const checkAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
      return next();
    }
    throw 'Unauthorized';
  } catch (err) {
    const error = { message: err };
    res.status(500).json(error);
  }
};
