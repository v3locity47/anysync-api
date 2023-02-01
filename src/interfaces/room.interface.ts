import { IUser, IUserWithSocket } from './user.interface';

export interface IRoomInvite {
  toUserId: string;
  fromUser: IUser;
}
