import { users } from '../db/db.js';
import { validate as uuidValidate } from 'uuid';

const updateUser = (req, res, id) => {
  let body = [];
  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = JSON.parse(Buffer.concat(body).toString());
      const userData = {
        id: id,
        username: body.username,
        age: body.age,
        hobbies: body.hobbies,
      };
      let index = users.findIndex((el) => el.id === id);
      users.splice(index, 1, userData);
      res.statusCode = 200;
      res.end(`${JSON.stringify(userData)}`);
    });
};

export const putMethod = (req, res) => {
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
  }
};
