import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string;
            avatar: string;
        } & DefaultSession['user'];
    }

    interface User extends DefaultUser {
        id: string;
        avatar: string;
        name: string;
        email: string;
    }
}
