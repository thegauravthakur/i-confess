import type { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import { useSession } from '../hooks/useSession';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const router = useRouter();
    const [user, isSessionDataLoading] = useSession();

    if (!user && typeof window !== 'undefined') {
        router.push('/login').then();
        return null;
    }

    if (isSessionDataLoading) return null; // probably show a spinner/shimmer here

    return (
        <div>
            <p>Home Page</p>
            <button onClick={() => signOut()}>logout</button>
        </div>
    );
};

export default Home;
