import { users } from '../db/db.js';
import { validate as uuidValidate } from 'uuid';

const getUsers = (res) => {
  res.statusCode = 200;
  res.end(`${JSON.stringify(users)}`);
};

const getUser = (res, id) => {
  if (uuidValidate(id)) {
    const userToFind = users.filter((user) => user.id === id);
    if (userToFind.length) {
      res.statusCode = 200;
      res.end(`${JSON.stringify(userToFind)}`);
    } else {
      res.statusCode = 404;
      res.end(`"message":"No user with ID ${id}"`);
    }
  } else {
    res.statusCode = 400;
    res.end(`"message":"ID ${id} is invalid"`);
  }
};

export const getMethod = (url, res) => {
  if (url === '/users/' || url === '/users') {
    getUsers(res);
  } else if (url.slice(0, 7) === '/users/') {
    const id = url.slice(7, url.length);
    getUser(res, id);
  }
};
