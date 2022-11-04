import crypto from 'crypto';
import fs from 'fs';

const genKeyPair = () => {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, //bits - standard for rsa keys
    publicKeyEncoding: {
      type: 'pkcs1', // Public Key Cryptography Standards 1
      format: 'pem', // Common Format for Keys
    },
    privateKeyEncoding: {
      type: 'pkcs1', // Public Key Cryptography Standards 1
      format: 'pem', // Common Format for Keys
    },
  });

  fs.writeFileSync('./id_rsa.pub.pem', keyPair.publicKey);
  fs.writeFileSync('./id_rsa.priv.pem', keyPair.privateKey);
};

genKeyPair();
