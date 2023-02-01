import { SessionSocket } from '../../interfaces/socket.interface';
import { removeUserHash, setOnlineStatus } from '../../services/user.service';

export const onDisconnect = (socket: SessionSocket) =>
  socket.on('disconnect', () => {
    const userId = socket.data.user._id;
    setOnlineStatus(userId, false);
    removeUserHash(userId, 'socketId');
    socket.broadcast.emit('user:disconnected', userId);
  });
