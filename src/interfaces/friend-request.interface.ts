import { Types } from 'mongoose';

export enum RequestStatus {
  REQUESTED = '0',
  ACCEPTED = '1',
  REJECTED = '2',
}

export interface IFriendRequest {
  readonly _id?: Types.ObjectId;
  requester: Types.ObjectId;
  recipient: Types.ObjectId;
  status: RequestStatus;
  createdAt?: string;
  updatedAt?: string;
}
