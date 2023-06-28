import { users } from '../db/db.js';
import { v4 as uuidv4 } from 'uuid';

export const postMethod = (req, res) => {
  if (req.url === '/users/' || req.url === '/users') {
    let body = [];
    req
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = JSON.parse(Buffer.concat(body).toString());
        postUser(res, body);
      });
  }
};

const postUser = (res, reqData) => {
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
