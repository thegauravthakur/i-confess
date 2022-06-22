import type { InferGetStaticPropsType, NextPage } from 'next';
import { useSession } from '../hooks/useSession';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { getSession, signOut } from 'next-auth/react';
import { NewConfessionBox } from '../components/NewConfessionBox';
import { getAllConfessions } from '../controller/confession';
import { useConfessions } from '../hooks/useConfessions';

const HomePage: NextPage = ({
    userSession,
    initialConfessions,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const [session] = useSession({ queryConfig: { initialData: userSession } });
    const [confessions] = useConfessions({
        queryConfig: { initialData: initialConfessions },
    });
    console.log(confessions);

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
                    {confessions?.map(({ id, description }) => (
                        <p key={id}>{description}</p>
                    ))}
                    <button onClick={() => signOut()}>Sign Out</button>
                    <button
                        onClick={async () => {
                            await fetch('/api/confession/get');
                        }}
                    >
                        test
                    </button>
                </div>
                <div className={cn('bg-pink-200')}>right</div>
            </div>
        </div>
    );
};

export async function getServerSideProps(context: any) {
    const [userSession, confessions] = await Promise.all([
        getSession(context),
        getAllConfessions(),
    ]);

    if (!userSession) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: { userSession, confessions: JSON.stringify(confessions) },
    };
}

export default HomePage;
