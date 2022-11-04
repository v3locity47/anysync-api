import { FriendRequest } from '../models/friend-request.model';
import {
  IFriendRequest,
  RequestStatus,
} from '../interfaces/friend-request.interface';
import { IErrorMessage } from '../interfaces/error.interface';
import * as UserService from './user.service';

export const create = async (
  requesterId: string,
  recipientId: string
): Promise<IFriendRequest | IErrorMessage> => {
  const requests = await FriendRequest.find({
    requester: requesterId,
    recipient: recipientId,
  });
  const activeRequests = requests.filter(
    (friendReq) => friendReq.status != RequestStatus.REJECTED
  );
  if (activeRequests.length != 0) {
    return { message: 'Request Already Present' };
  }
  const requestData = {
    requester: requesterId,
    recipient: recipientId,
    status: RequestStatus.REQUESTED,
  };
  const newRequest = await FriendRequest.create(requestData);
  return newRequest;
};

export const update = async (
  requestId: string,
  status: string
): Promise<IFriendRequest> => {
  const updatedRequest = await FriendRequest.findOneAndUpdate(
    { _id: requestId },
    { $set: { status: status } },
    { new: true }
  ).lean();
  if (status === RequestStatus.ACCEPTED) {
    await UserService.addFriend(
      updatedRequest.requester,
      updatedRequest.recipient
    );
  }
  return updatedRequest;
};
