import type { InferGetStaticPropsType, NextPage } from 'next';
import { useSession } from '../hooks/useSession';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { getSession, signOut } from 'next-auth/react';
import { NewConfessionBox } from '../components/NewConfessionBox';

const HomePage: NextPage = ({
    userSession,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const [session] = useSession({ queryConfig: { initialData: userSession } });

    if (!session && typeof window !== 'undefined') {
        router.push('/login').then();
    }

    return (
        <div className={cn('space-y-5 bg-slate-100 min-h-screen')}>
            <header className={cn('h-12 bg-gray-500')}></header>
            <div
                className={cn(
                    'grid grid-cols-[1fr_600px_1fr] max-w-7xl mx-auto gap-x-8'
                )}
            >
                <div className={cn('bg-amber-300')}>left</div>
                <div className='flex flex-col'>
                    <NewConfessionBox />
                    <button onClick={() => signOut()}>Sign Out</button>
                </div>
                <div className={cn('bg-pink-200')}>right</div>
            </div>
        </div>
    );
};

export async function getServerSideProps(context: any) {
    const userSession = await getSession(context);

    if (!userSession) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: { userSession },
    };
}

export default HomePage;
