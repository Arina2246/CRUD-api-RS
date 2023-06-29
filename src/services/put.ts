import { users } from '../db/db.js';
import { validate as uuidValidate } from 'uuid';
import { BodyType } from '../types/types.js';
import { IncomingMessage, ServerResponse } from 'http';

const updateUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
  let body = [];
  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      const bodyData = JSON.parse(Buffer.concat(body).toString()) as BodyType;
      const userData = {
        id: id,
        username: bodyData.username,
        age: bodyData.age,
        hobbies: bodyData.hobbies,
      };
      let index = users.findIndex((el) => el.id === id);
      users.splice(index, 1, userData);
      res.statusCode = 200;
      res.end(`${JSON.stringify(userData)}`);
    });
};

export const putMethod = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url.slice(0, 7) === '/users/') {
    const id = req.url.slice(7, req.url.length);
    if (uuidValidate(id)) {
      const userToFind = users.filter((user) => user.id === id);
      if (userToFind.length) {
        updateUser(req, res, id);
      } else {
        res.statusCode = 404;
        res.end(`"message":"No user with ID ${id}"`);
      }
    } else {
      res.statusCode = 400;
      res.end(`"message":"ID ${id} is invalid"`);
    }
  } else {
    res.statusCode = 404;
    res.end(`"message":"wrong URL"`);
  }
};
