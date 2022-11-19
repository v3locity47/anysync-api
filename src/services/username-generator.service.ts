import { Adjective, Animal, Number } from '../helper/usernamewords.js';

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

export const generateUsername = () => {
  const adj = Adjective.random();
  const animName = Animal.random();
  const num = Number.random();
  return `${adj}${animName}${num}`;
};
