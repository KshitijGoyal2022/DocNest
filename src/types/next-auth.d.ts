import type { Session, User } from 'next-auth';
import type {JWT} from   'next-auth/jwt';

type UserId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId;
    username: string | null;
    // name?: string
    // email: string
    // image: string
  }
}
declare module 'next-auth' {
  interface Session {
    id: UserId;
    username: string | null;
  }
}
