import os from 'os';

export const handleOS = async (args) => {
  const option = args[0];

  switch (option) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;

    case '--cpus':
      const cpus = os.cpus();
      console.log(`Количество ядер: ${cpus.length}`);
      cpus.forEach((cpu, index) => {
        console.log(`Ядро #${index + 1}: ${cpu.model}, ${cpu.speed / 1000} GHz`);
      });
      break;

    case '--homedir':
      console.log(os.homedir());
      break;

    case '--username':
      console.log(os.userInfo().username);
      break;

    case '--architecture':
      console.log(process.arch);
      break;

    default:
      console.log('Недопустимый ввод');
  }

  return process.cwd();
};
