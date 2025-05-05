import fs from 'fs';
import path from 'path';

export const handleFile = async (command, args, cwd) => {
  try {
    switch (command) {
      case 'cat': {
        const filePath = path.resolve(cwd, args[0]);
        const stream = fs.createReadStream(filePath, 'utf-8');
        stream.pipe(process.stdout);
        await new Promise((res) => stream.on('end', res));
        break;
      }

      case 'add': {
        const filePath = path.resolve(cwd, args[0]);
        await fs.promises.writeFile(filePath, '');
        break;
      }

      case 'mkdir': {
        const dirPath = path.resolve(cwd, args[0]);
        await fs.promises.mkdir(dirPath, { recursive: true });
        break;
      }

      case 'rn': {
        const oldPath = path.resolve(cwd, args[0]);
        const newPath = path.resolve(path.dirname(oldPath), args[1]);
        await fs.promises.rename(oldPath, newPath);
        break;
      }

      case 'cp': {
        const srcPath = path.resolve(cwd, args[0]);
        const destDir = path.resolve(cwd, args[1]);
        const fileName = path.basename(srcPath);
        const destPath = path.join(destDir, fileName);

        await fs.promises.mkdir(destDir, { recursive: true });

        const readStream = fs.createReadStream(srcPath);
        const writeStream = fs.createWriteStream(destPath);

        readStream.pipe(writeStream);

        await new Promise((res, rej) => {
          writeStream.on('finish', res);
          writeStream.on('error', rej);
        });

        break;
      }

      case 'mv': {
        const srcPath = path.resolve(cwd, args[0]);
        const destDir = path.resolve(cwd, args[1]);
        const fileName = path.basename(srcPath);
        const destPath = path.join(destDir, fileName);

        await fs.promises.mkdir(destDir, { recursive: true });

        const readStream = fs.createReadStream(srcPath);
        const writeStream = fs.createWriteStream(destPath);

        readStream.pipe(writeStream);

        await new Promise((res, rej) => {
          writeStream.on('finish', res);
          writeStream.on('error', rej);
        });

        await fs.promises.unlink(srcPath);
        break;
      }

      case 'rm': {
        const filePath = path.resolve(cwd, args[0]);
        await fs.promises.unlink(filePath);
        break;
      }

      default:
        console.log('Недопустимый ввод');
        break;
    }
  } catch (err) {
    console.log('Операция не выполнена');
  }

  return cwd;
};
