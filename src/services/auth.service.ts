import fs from 'fs';
import { Types } from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';

export const issueJWT = (userId: Types.ObjectId) => {
  const PRIVATE_KEY = fs.readFileSync('./src/config/id_rsa.priv.pem', 'utf8');
  const _id = userId;
  const expiresIn = 1 * 24 * 3600000;

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIVATE_KEY, {
    expiresIn: expiresIn,
    algorithm: 'RS256',
  });

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  };
};
