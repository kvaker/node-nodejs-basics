import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');

  try {
    await fs.access(filePath);

    await fs.unlink(filePath);
    console.log('File deleted successfully!');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('FS operation failed');
    } else {
      console.error(err.message);
    }
  }
};

await remove();
