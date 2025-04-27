import fs from 'fs';
import crypto from 'crypto';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const calculateHash = async () => {
  const filePath = resolve(__dirname, 'files', 'fileToCalculateHashFor.txt');
  
  const readableStream = fs.createReadStream(filePath);
  
  const hash = crypto.createHash('sha256');
  
  readableStream.pipe(hash);

  hash.on('finish', () => {
    console.log(`Хэш файла: ${hash.digest('hex')}`);
  });
};

await calculateHash();
