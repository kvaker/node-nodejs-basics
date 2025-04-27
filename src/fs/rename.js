import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  const oldFilePath = path.join(__dirname, 'files', 'wrongFilename.txt');
  const newFilePath = path.join(__dirname, 'files', 'properFilename.md');

  console.log(`Attempting to rename file from: ${oldFilePath} to: ${newFilePath}`);

  try {
    try {
      await fs.access(newFilePath);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    await fs.access(oldFilePath);

    await fs.rename(oldFilePath, newFilePath);
    console.log('File renamed successfully');
    
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

await rename();

