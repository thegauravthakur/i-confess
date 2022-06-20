import type { InferGetStaticPropsType, NextPage } from 'next';
import { useSession } from '../hooks/useSession';
import { useRouter } from 'next/router';
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
        <div>
            <button
                onClick={async () => {
                    await signOut();
                }}
            >
                sign out
            </button>
            <button
                onClick={() => {
                    setShowConversationModal(!showNewConversationModal);
                }}
            >
                create conversation
            </button>
            {showNewConversationModal && (
                <ReactFocusLock>
                    <NewConfessionInputBox
                        setShowNewConversationModal={setShowConversationModal}
                    />
                </ReactFocusLock>
            )}
            <button
                onClick={() => {
                    setShowConversationModal(!showNewConversationModal);
                }}
            >
                one more
            </button>
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
