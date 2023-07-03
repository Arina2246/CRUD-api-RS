import { ServerResponse } from 'http';
import { users } from '../db/db.ts';
import { validate as uuidValidate } from 'uuid';

const getUsers = (res: ServerResponse) => {
  res.statusCode = 200;
  res.end(`${JSON.stringify(users)}`);
};

const getUser = (res: ServerResponse, id: string) => {
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

export const getMethod = (url: string, res: ServerResponse) => {
  if (url === '/api/users/' || url === '/api/users') {
    getUsers(res);
  } else if (url.slice(0, 11) === '/api/users/') {
    const id = url.slice(11, url.length);
    getUser(res, id);
  } else {
    res.statusCode = 404;
    res.end(`"message":"wrong URL"`);
  }
};
