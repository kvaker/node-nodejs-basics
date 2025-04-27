import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  const sourceDir = path.join(__dirname, 'files');
  const targetDir = path.join(__dirname, 'files_copy');

  try {
    await fs.access(sourceDir);
  } catch (err) {
    console.error('FS operation failed');
    return;
  }

  try {
    await fs.access(targetDir);
    console.error('FS operation failed');
    return;
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error('FS operation failed');
      return;
    }
  }

  try {
    await fs.mkdir(targetDir);

    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      const sourceFilePath = path.join(sourceDir, file);
      const targetFilePath = path.join(targetDir, file);

      const stats = await fs.stat(sourceFilePath);
      if (stats.isDirectory()) {
        await copyDirectory(sourceFilePath, targetFilePath);
      } else {
        await fs.copyFile(sourceFilePath, targetFilePath);
      }
    }

    console.log('Folder copied successfully!');
  } catch (err) {
    console.error('Error copying folder:', err.message);
  }
};

const copyDirectory = async (sourceDir, targetDir) => {
  try {
    await fs.mkdir(targetDir);

    const files = await fs.readdir(sourceDir);
    for (const file of files) {
      const sourceFilePath = path.join(sourceDir, file);
      const targetFilePath = path.join(targetDir, file);

      const stats = await fs.stat(sourceFilePath);
      if (stats.isDirectory()) {
        await copyDirectory(sourceFilePath, targetFilePath);
      } else {
        await fs.copyFile(sourceFilePath, targetFilePath);
      }
    }
  } catch (err) {
    console.error('Error copying directory:', err.message);
    console.error('FS operation failed');
  }
};

await copy();
