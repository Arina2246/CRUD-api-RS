import http from 'http';
import { getMethod } from './services/get.js';

const host = 'localhost';
const port = 3000;

const listener = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  switch (req.method) {
    case 'GET':
      getMethod(req.url, res);
      break;
  }
};
const server = http.createServer(listener);

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
