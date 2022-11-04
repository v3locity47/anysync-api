import { FriendRequest } from "../models/friendRequestModel";
import {
  IFriendRequest,
  RequestStatus,
} from "../interfaces/friendRequestInterface";
import { IErrorMessage } from "../interfaces/errorInterface";

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
    return { message: "Request Already Present" };
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
  return updatedRequest;
};
