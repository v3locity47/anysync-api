import { Server as SocketServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { Request, Response, NextFunction } from 'express';
import { checkAuthentication } from '../middlewares/authentication.middleware';
import { sessionConfig } from '../config/session';
import session from 'express-session';
import { RegisterEventHandlers } from './socket-event-handlers/index';
import { setOnlineStatus, setUserHash } from '../services/user.service';
import { SessionSocket, IOServer } from '../interfaces/socket.interface';
import { IUserWithSocket } from '../interfaces/user.interface';
import passport from 'passport';
import { instrument } from '@socket.io/admin-ui';

type middlewareTypeForSockets = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const middlewareWrapper =
  (middleware: middlewareTypeForSockets) =>
  (socket: Socket, next: NextFunction) =>
    middleware(socket.request as Request, {} as Response, next);

const onConnection = (io: IOServer) => (socket: SessionSocket) => {
  try {
    console.log('connected');
    const user = socket.request.user;
    socket.data.user = user;
    const userWithSocketId = { socketId: socket.id, ...user };
    const userId = String(user._id);
    socket.join(userId);
    socket.broadcast.emit('user:connected', userId);
    setUserHash(userId, userWithSocketId);
    setOnlineStatus(socket.data.user._id, true);
    RegisterEventHandlers(socket, io);
  } catch (err) {
    console.log(err);
  }
};

export const initializeSocketIO = (httpServer: HttpServer) => {
  const io: IOServer = new SocketServer(httpServer, {
    cors: {
      origin: ['https://admin.socket.io', 'http://localhost:3000'],
      credentials: true,
    },
  });
  instrument(io, { auth: false, mode: 'development' });
  io.use(middlewareWrapper(session(sessionConfig)));
  io.use(middlewareWrapper(passport.initialize()));
  io.use(middlewareWrapper(passport.session()));
  //   io.use(middlewareWrapper(checkAuthentication));
  io.on('connection', onConnection(io));
};
