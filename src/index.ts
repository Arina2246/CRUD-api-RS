import http, { IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import { getMethod } from './services/get.ts';
import { postMethod } from './services/post.ts';
import { putMethod } from './services/put.ts';
import { deleteMethod } from './services/delete.ts';
dotenv.config();

const host = 'localhost';
const port: number = Number(process.env.DEV_PORT);

const listener = (req: IncomingMessage, res: ServerResponse) => {
  try {
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
  } catch {
    res.statusCode = 500;
    res.end(`"message":"server side error"`);
  }
};
const server = http.createServer(listener);

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
