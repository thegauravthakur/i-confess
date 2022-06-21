import type { InferGetStaticPropsType, NextPage } from 'next';
import { useSession } from '../hooks/useSession';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { NewConfessionInputBox } from '../components/NewConfessionInputBox';
import { getSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import ReactFocusLock from 'react-focus-lock';

const HomePage: NextPage = ({
    userSession,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
    const [showNewConversationModal, setShowConversationModal] =
        useState(false);
    const router = useRouter();
    const [user] = useSession({ queryConfig: { initialData: userSession } });

    if (!user && typeof window !== 'undefined') {
        router.push('/login').then();
    }

    return (
        <div className={cn('space-y-5')}>
            <header className={cn('h-12 bg-gray-500')}></header>
            <div
                className={cn(
                    'grid grid-cols-[1fr_600px_1fr] max-w-7xl mx-auto'
                )}
            >
                <div className={cn('bg-amber-300')}>left</div>
                <div className='flex flex-col'>
                    <button onClick={() => signOut()}>Sign Out</button>
                    <button onClick={() => setShowConversationModal(true)}>
                        Create Confesssion
                    </button>
                    {showNewConversationModal && (
                        <ReactFocusLock>
                            <NewConfessionInputBox
                                setShowNewConversationModal={
                                    setShowConversationModal
                                }
                            />
                        </ReactFocusLock>
                    )}
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
