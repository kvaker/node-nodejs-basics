import os from 'os';
import readline from 'readline';
import { homedir } from 'os';
import { handleCommand } from './commands/index.js';

const usernameArg = process.argv.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'anonym';
let currentDir = homedir();

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currentDir}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

const exit = () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
};

rl.prompt();

rl.on('line', async (input) => {
  const command = input.trim();

  if (command === '.exit') {
    exit();
  } else {
    currentDir = await handleCommand(command, currentDir);
    console.log(`You are currently in ${currentDir}`);
    rl.prompt();
  }
});

process.on('SIGINT', exit);
