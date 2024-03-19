import { generateKeyPairSync } from 'crypto';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const keyEncoding = {
  type: 'pkcs1',
  format: 'pem',
};

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: keyEncoding,
  privateKeyEncoding: keyEncoding,
});

const outputFolder = './certs/';

if (!existsSync(outputFolder)) {
  mkdirSync(outputFolder);
}

writeFileSync(outputFolder + 'private.pem', privateKey);
writeFileSync(outputFolder + 'public.pem', publicKey);
