import 'express';
import {UserToken} from '../types/users.type';

declare global {
  namespace Express {
    interface Request {
      user?: UserToken
    }
  }
}