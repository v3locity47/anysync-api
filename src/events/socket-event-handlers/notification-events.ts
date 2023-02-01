import { SessionSocket } from '../../interfaces/socket.interface';
import { checkOnlineUsers } from '../../services/user.service';

export const emitFriendStatus = async (socket: SessionSocket) => {
  const { friends } = socket.data.user;
  console.log(friends);
  const friendsStatus = await checkOnlineUsers(friends);
  return socket.emit('notify:friend-status', friendsStatus);
};
