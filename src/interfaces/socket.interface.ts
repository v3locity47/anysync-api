import { IncomingMessage } from 'http';
import { SessionData } from 'express-session';
import { Server, Socket } from 'socket.io';
import { IUser } from './user.interface';
import { IRoomInvite } from './room.interface';

export interface IServerToClientEvents {
  'room:invite': (invitation: IRoomInvite) => void;
  'notify:friend-status': (friendStatus: object) => void;
  'user:connected': (userId: string) => void;
  'user:disconnected': (userId: string) => void;
}

export interface IClientToServerEvents {
  'room:send-invite': (userId: string) => void;
  'room:join': (roomId: string) => void;
}

export interface IInterServerEvents {
  ping: () => void;
}

export interface SessionIncomingMessage extends IncomingMessage {
  session: SessionData;
  user: IUser;
}

export interface SocketData {
  user: IUser;
}

export type IOServer = Server<
  IClientToServerEvents,
  IServerToClientEvents,
  IInterServerEvents,
  SocketData
>;

export interface SessionSocket
  extends Socket<
    IClientToServerEvents,
    IServerToClientEvents,
    IInterServerEvents,
    SocketData
  > {
  request: SessionIncomingMessage;
}
