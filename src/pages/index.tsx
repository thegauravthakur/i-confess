import type { NextPage } from 'next';
import { useSession } from '../hooks/useSession';
import { useRouter } from 'next/router';
import { NewConfessionInputBox } from '../components/NewConfessionInputBox';
import { signOut } from 'next-auth/react';

const HomePage: NextPage = () => {
    const router = useRouter();
    const [user, isSessionDataLoading] = useSession();

    if (!user && typeof window !== 'undefined') {
        router.push('/login').then();
        return null;
    }

    if (isSessionDataLoading) return null; // probably show a spinner/shimmer here

    return (
        <div>
            <button
                onClick={async () => {
                    await signOut();
                }}
            >
                sign out
            </button>
            <NewConfessionInputBox />
        </div>
    );
};

export default HomePage;
