import 'express-session';
import { IUser } from '../interfaces/user.interface';

declare module 'express-session' {
  interface SessionData {
    redirectUrl: string;
    passport: { user: string };
  }
}
