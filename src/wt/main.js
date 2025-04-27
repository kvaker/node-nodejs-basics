import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';

const performCalculations = async () => {
  const numCPUs = os.cpus().length;
  const workers = [];
  const results = [];

  for (let i = 0; i < numCPUs; i++) {
    const worker = new Worker(path.resolve('./worker.js'));
    workers.push(worker);
  }

  const promises = workers.map((worker, index) => {
    return new Promise((resolve) => {
      worker.once('message', (message) => {
        resolve(message);
      });

      worker.once('error', () => {
        resolve({ status: 'error', data: null });
      });

      worker.postMessage(10 + index);
    });
  });

  const finalResults = await Promise.all(promises);
  console.log(finalResults);
};

await performCalculations();
