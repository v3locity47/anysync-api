import { Server } from 'socket.io';
import { SessionSocket } from '../../interfaces/session.interface';
import { getUserHash } from '../../services/user.service';

export const joinRoom = (socket: SessionSocket) =>
  socket.on('room:join', (roomId: string) => {
    socket.join(roomId);
    socket.leave(socket.id);
    console.log(socket.rooms);
    console.log(socket.data);
    console.log(socket.id);
  });

export const sendRoomInvite = (socket: SessionSocket, io: Server) =>
  socket.on('room:send-invite', async (userId: string) => {
    const toUser = await getUserHash(userId);
    const fromUser = socket.data.user;
    if (toUser.socketId) {
      const invitation = { fromUser: fromUser, toUserId: toUser._id };
      io.to(toUser.socketId).emit('room:invite', invitation);
    }
  });
