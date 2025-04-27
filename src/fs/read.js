import { readFile } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

  try {
    const content = await readFile(filePath, 'utf-8');
    console.log(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('FS operation failed');
    } else {
      console.error(err.message);
    }
  }
};

await read();
