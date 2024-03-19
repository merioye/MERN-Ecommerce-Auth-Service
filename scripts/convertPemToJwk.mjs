import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import rsaPemToJwk from 'rsa-pem-to-jwk';

const privatePemKey = readFileSync('./certs/private.pem');

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const jwk = rsaPemToJwk(privatePemKey, { use: 'sig' }, 'public');

const outputFolder = './public/.well-known/';

if (!existsSync(outputFolder)) {
  mkdirSync(outputFolder, { recursive: true });
}

const jwks = {
  keys: [jwk],
};

writeFileSync(outputFolder + 'jwks.json', JSON.stringify(jwks));
