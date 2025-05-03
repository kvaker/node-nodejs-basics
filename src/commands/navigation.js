import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const isRoot = (dir) => {
  const root = path.parse(dir).root;
  return dir === root;
};

export const handleNavigation = async (command, args, currentDir) => {
  const cwd = currentDir;

  switch (command) {
    case 'up':
      if (!isRoot(cwd)) {
        return path.dirname(cwd);
      }
      return cwd;

    case 'cd':
      if (!args[0]) throw new Error('Недопустимый ввод');
      const targetPath = path.resolve(cwd, args[0]);
      try {
        const stat = await fs.stat(targetPath);
        if (stat.isDirectory()) {
          return targetPath;
        } else {
          throw new Error();
        }
      } catch {
        throw new Error('Операция не выполнена');
      }

    case 'ls':
      try {
        const files = await fs.readdir(cwd, { withFileTypes: true });
        const sorted = files.sort((a, b) => {
          if (a.isDirectory() && !b.isDirectory()) return -1;
          if (!a.isDirectory() && b.isDirectory()) return 1;
          return a.name.localeCompare(b.name);
        });

        console.table(sorted.map((f) => ({
          Name: f.name,
          Type: f.isDirectory() ? 'directory' : 'file'
        })));
      } catch {
        throw new Error('Операция не выполнена');
      }
      return cwd;

    default:
      throw new Error('Недопустимый ввод');
  }
};
