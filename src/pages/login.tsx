import type { NextPage } from 'next';
import { AiOutlineGoogle, AiOutlineGithub } from 'react-icons/ai';
import cn from 'classnames';
import { SocialLoginButton } from '../components/SocialLoginButton';
import { useSession } from '../hooks/useSession';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getSession, signIn } from 'next-auth/react';

const LoginPage: NextPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user] = useSession({
        queryConfig: {
            onSuccess: () => setLoading(false),
            onError: () => setLoading(false),
        },
    });

    if (user && typeof window !== 'undefined') {
        router.push('/').then();
    }

    return (
        <div
            className={cn(
                'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen px-3',
                'flex items-center justify-center flex-col space-y-7'
            )}
        >
            <h1 className={cn('text-3xl font-bold text-white')}>Confess It</h1>
            <p className={cn('text-white max-w-md text-center')}>
                Make your heart a bit lighter by confessing secrets to others
                who understand you while keeping your identity a private
            </p>
            <SocialLoginButton
                TrailingWidget={AiOutlineGoogle}
                isLoading={loading}
                text='Continue with Google'
                onClick={async () => {
                    setLoading(true);
                    await signIn('google');
                }}
            />
            <SocialLoginButton
                TrailingWidget={AiOutlineGithub}
                isLoading={loading}
                text='Continue with GitHub'
                onClick={async () => {
                    setLoading(true);
                    await signIn('github');
                }}
            />
        </div>
    );
};

export async function getServerSideProps(context: any) {
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}

export default LoginPage;
