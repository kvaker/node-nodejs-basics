import fs from 'fs';
import path from 'path';

export const handleFile = async (command, args, cwd) => {
  switch (command) {
    case 'cat': {
      const filePath = path.resolve(cwd, args[0]);
      const stream = fs.createReadStream(filePath, 'utf-8');
      stream.pipe(process.stdout);
      await new Promise((res) => stream.on('end', res));
      return cwd;
    }


    default:
      throw new Error('Недопустимый ввод');
  }
};
