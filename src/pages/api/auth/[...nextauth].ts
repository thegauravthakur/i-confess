import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { createMergeUser, getUserDetails } from '../../../controller/user';

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_KEY,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_KEY!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    events: {
        signIn: async ({ user, account }) => {
            if (['google', 'github'].includes(account.provider.toLowerCase())) {
                await createMergeUser({
                    name: user.name ?? '',
                    avatar: user.image ?? '',
                    email: user.email ?? '',
                });
            }
        },
    },
    callbacks: {
        session: async ({ session, token }) => {
            // check if we can reduce the call to this function by moving it to jwt callback
            const { _id, __v, ...rest } = await getUserDetails(
                token.email as string
            );
            session.user = { ...rest, id: _id };
            return session;
        },
    },
});
