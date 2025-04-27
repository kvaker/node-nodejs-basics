import { parentPort } from 'worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (data) => {
  parentPort.postMessage(data);
};

parentPort.on('message', (n) => {
  try {
    const result = nthFibonacci(n);
    sendResult({ status: 'resolved', data: result });
  } catch (error) {
    sendResult({ status: 'error', data: null });
  }
});
