import fs from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const read = async () => {
  const filePath = resolve(__dirname, 'files', 'fileToRead.txt');
  const readableStream = fs.createReadStream(filePath, 'utf-8');

  readableStream.pipe(process.stdout);
};

await read();
