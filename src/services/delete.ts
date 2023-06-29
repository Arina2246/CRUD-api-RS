import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../db/db.js';
import { validate as uuidValidate } from 'uuid';

const deleteUser = (res: ServerResponse, id: string) => {
  let index = users.findIndex((el) => el.id === id);
  users.splice(index, 1);
  res.statusCode = 204;
  res.end();
};

export const deleteMethod = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  if (req.url.slice(0, 7) === '/users/') {
    const id = req.url.slice(7, req.url.length);
    if (uuidValidate(id)) {
      const userToFind = users.filter((user) => user.id === id);
      if (userToFind.length) {
        deleteUser(res, id);
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
