import { Server as SocketServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { Request, Response, NextFunction } from 'express';
import { checkAuthentication } from '../middlewares/authentication.middleware';
import { sessionConfig } from '../config/session';
import session from 'express-session';
import { SessionSocket } from '../interfaces/session.interface';
import { RegisterEventHandlers } from './socket-event-handlers/index';
import { setOnlineStatus, setUserHash } from '../services/user.service';
import passport from 'passport';

type middlewareTypeForSockets = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const middlewareWrapper =
  (middleware: middlewareTypeForSockets) =>
  (socket: Socket, next: NextFunction) =>
    middleware(socket.request as Request, {} as Response, next);

const onConnection = (io: SocketServer) => (socket: SessionSocket) => {
  console.log('connected');
  const user = socket.request.user;
  socket.data.user = user;
  const userWithSocketId = { socketId: socket.id, ...user };
  const userId = String(user._id);
  socket.join(userId);
  setUserHash(userId, userWithSocketId);
  setOnlineStatus(socket.data.user._id, true);
  RegisterEventHandlers(socket, io);
};

export const initializeSocketIO = (httpServer: HttpServer) => {
  const io = new SocketServer(httpServer, { cors: { origin: '*' } });
  //   io.use(middlewareWrapper(checkAuthentication));
  io.use(middlewareWrapper(session(sessionConfig)));
  io.use(middlewareWrapper(passport.initialize()));
  io.use(middlewareWrapper(passport.session()));
  io.on('connection', onConnection(io));
};
