import { Adjective, Animal, Number } from '../helper/usernamewords.js';
import { UserModel } from '../models/user.model';

// Array.prototype.random = function () {
//   return this[Math.floor(Math.random() * this.length)];
// };

const randItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const generateUsername = async () => {
  const adj = randItem(Adjective);
  const animName = randItem(Animal);
  const num = randItem(Number);
  const username = `${adj}${animName}${num}`;
  const isUsernamePresent = await UserModel.findOne({
    username: username,
  }).lean();
  if (!isUsernamePresent) {
    return username;
  }
  generateUsername();
};
