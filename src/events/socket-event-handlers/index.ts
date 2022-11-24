import { SessionSocket } from '../../interfaces/session.interface';
import { joinRoom, sendRoomInvite } from './room-events';
import { Server } from 'socket.io';
import { onDisconnect } from './global-events';

export const RegisterEventHandlers = async (
  socket: SessionSocket,
  io: Server
) => {
  onDisconnect(socket);
  joinRoom(socket);
  sendRoomInvite(socket, io);
  io.fetchSockets().then(([socket]) => console.log(socket.id));
};
