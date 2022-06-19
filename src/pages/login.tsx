import type { NextPage } from 'next';
import { AiOutlineGoogle, AiOutlineGithub } from 'react-icons/ai';
import cn from 'classnames';
import { SocialLoginButton } from '../components/SocialLoginButton';

const Home: NextPage = () => {
    return (
        <div
            className={cn(
                'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen',
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
                text='Continue with Google'
            />
            <SocialLoginButton
                TrailingWidget={AiOutlineGithub}
                text='Continue with GitHub'
            />
        </div>
    );
};

export default Home;
