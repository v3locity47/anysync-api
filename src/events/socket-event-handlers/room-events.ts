import { IOServer, SessionSocket } from '../../interfaces/socket.interface';
import { getUserHash } from '../../services/user.service';
import { IRoomInvite } from '../../interfaces/room.interface';

export const joinRoom = (socket: SessionSocket) =>
  socket.on('room:join', (roomId: string) => {
    socket.join(roomId);
  });

export const sendRoomInvite = (socket: SessionSocket, io: IOServer) =>
  socket.on('room:send-invite', async (userId: string) => {
    const toUser = await getUserHash(userId);
    const fromUser = socket.data.user;
    if (toUser.socketId) {
      const invitation: IRoomInvite = {
        fromUser: fromUser,
        toUserId: toUser._id,
      };
      console.log(invitation);
      io.to(toUser.socketId).emit('room:invite', invitation);
    }
  });
