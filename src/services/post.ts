import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../db/db.js';
import { v4 as uuidv4 } from 'uuid';
import { BodyType } from '../types/types.js';

export const postMethod = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/users/' || req.url === '/users') {
    let body = [];
    req
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        const bodyData: BodyType = JSON.parse(Buffer.concat(body).toString());
        postUser(res, bodyData);
      });
  } else {
    res.statusCode = 404;
    res.end(`"message":"wrong URL"`);
  }
};

const postUser = (res: ServerResponse, reqData: BodyType) => {
  if ('username' in reqData && 'age' in reqData && 'hobbies' in reqData) {
    const userData = {
      id: uuidv4(),
      username: reqData.username,
      age: reqData.age,
      hobbies: reqData.hobbies,
    };
    users.push(userData);
    res.statusCode = 201;
    res.end(`${JSON.stringify(userData)}`);
  } else {
    res.statusCode = 400;
    res.end(`"message":"Body does not contain required fields"`);
  }
};
