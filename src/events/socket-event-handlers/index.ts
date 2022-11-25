import { IOServer, SessionSocket } from '../../interfaces/socket.interface';
import { joinRoom, sendRoomInvite } from './room-events';
import { Server } from 'socket.io';
import { onDisconnect } from './global-events';
import { emitFriendStatus } from './notification-events';

export const RegisterEventHandlers = async (
  socket: SessionSocket,
  io: IOServer
) => {
  onDisconnect(socket);
  joinRoom(socket);
  sendRoomInvite(socket, io);
  emitFriendStatus(socket);
};
