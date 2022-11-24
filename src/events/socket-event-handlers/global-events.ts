import { SessionSocket } from '../../interfaces/session.interface';
import { removeUserHash, setOnlineStatus } from '../../services/user.service';

export const onDisconnect = (socket: SessionSocket) =>
  socket.on('disconnect', () => {
    const userId = socket.data.user._id;
    setOnlineStatus(userId, false);
    removeUserHash(userId, 'socketId');
  });
