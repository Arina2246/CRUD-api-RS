import http from 'http';
import dotenv from 'dotenv';
import { getMethod } from './services/get.js';
import { postMethod } from './services/post.js';
import { putMethod } from './services/put.js';
import { deleteMethod } from './services/delete.js';
dotenv.config();

const host = 'localhost';
const port = process.env.DEV_PORT;

const listener = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  switch (req.method) {
    case 'GET':
      getMethod(req.url, res);
      break;
    case 'POST':
      postMethod(req, res);
      break;
    case 'PUT':
      putMethod(req, res);
      break;
    case 'DELETE':
      deleteMethod(req, res);
      break;
  }
};
const server = http.createServer(listener);

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
