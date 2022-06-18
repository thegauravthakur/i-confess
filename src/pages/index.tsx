import type { NextPage } from 'next';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from '../hooks/useSession';

const Home: NextPage = () => {
    const [session, loading] = useSession();
    console.log(session?.user);
    if (loading)
        return (
            <>
                <p>Loading</p>
                <button
                    onClick={async () => {
                        await fetch('/api/confession/create');
                    }}
                >
                    create confession
                </button>
            </>
        );
    if (session) {
        return (
            <>
                Signed in as {session.user?.email} <br />
                <button
                    onClick={async () => {
                        await fetch('/api/confession/create');
                    }}
                >
                    create confession
                </button>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn('github')}>
                Sign in with github
            </button>
            <button onClick={() => signIn('google')}>
                Sign in with Google
            </button>
            <p>Loading</p>
            <button
                onClick={async () => {
                    await fetch('/api/confession/create');
                }}
            >
                create confession
            </button>
        </>
    );
};

export default Home;
