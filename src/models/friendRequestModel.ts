import { Schema, model } from "mongoose";
import {
  IFriendRequest,
  RequestStatus,
} from "../interfaces/friendRequestInterface";

const friendRequestSchema = new Schema<IFriendRequest>({
  requester: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    required: true,
    enum: [
      RequestStatus.REQUESTED,
      RequestStatus.ACCEPTED,
      RequestStatus.REJECTED,
    ],
  },
});

const FriendRequest = model<IFriendRequest>(
  "FriendRequest",
  friendRequestSchema,
  "friend_requests"
);

export { FriendRequest };
