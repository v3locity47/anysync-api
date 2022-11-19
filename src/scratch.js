import { Adjective, Animal, Number } from './usernamewords.js';

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const generateUsername = () => {
  const adj = Adjective.random();
  const animName = Animal.random();
  const num = Number.random();
  console.log(`${adj}${animName}${num}`);
};

generateUsername();
