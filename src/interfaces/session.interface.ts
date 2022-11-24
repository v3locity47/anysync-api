import { IncomingMessage } from 'http';
import { SessionData } from 'express-session';
import { Socket } from 'socket.io';
import { IUser } from './user.interface';

export interface SessionIncomingMessage extends IncomingMessage {
  session: SessionData;
  user: IUser;
}

export interface SessionSocket extends Socket {
  request: SessionIncomingMessage;
}
