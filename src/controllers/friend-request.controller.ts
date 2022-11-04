import { Request, Response } from 'express';
import * as FriendRequestService from '../services/friend-request.service';

export const sendRequest = async (req: Request, res: Response) => {
  try {
    const { requesterId, recipientId } = req.body;
    const request = await FriendRequestService.create(requesterId, recipientId);
    res.status(201).json(request);
  } catch (err) {
    const error = { message: `${err}` };
    res.status(500).json(error);
  }
};

export const updateRequest = async (req: Request, res: Response) => {
  try {
    const { requestId, status } = req.body;
    const request = await FriendRequestService.update(requestId, status);
    res.status(200).json(request);
  } catch (err) {
    const error = { message: `${err}` };
    res.status(500).json(error);
  }
};
