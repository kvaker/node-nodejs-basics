import { readdir } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  const dirPath = path.join(__dirname, 'files');

  try {
    const files = await readdir(dirPath);
    console.log(files);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('FS operation failed');
    } else {
      console.error(err.message);
    }
  }
};

await list();
