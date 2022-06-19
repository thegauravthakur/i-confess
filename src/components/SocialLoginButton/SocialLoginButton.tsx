import cn from 'classnames';
import { IconBaseProps } from 'react-icons';
import { AiOutlineLoading } from 'react-icons/ai';
import { signIn } from 'next-auth/react';

interface SocialLoginButtonProps {
    TrailingWidget: (props: IconBaseProps) => JSX.Element;
    isLoading: boolean;
    text: string;
    onClick: () => void;
}

export function SocialLoginButton({
    TrailingWidget,
    isLoading,
    text,
    onClick,
}: SocialLoginButtonProps) {
    return (
        <button
            className={cn(
                'border px-5 py-2 shadow text-white rounded-md',
                'transition-shadow duration-300',
                'flex items-center space-x-3',
                { 'hover:shadow-xl active:shadow': !isLoading }
            )}
            disabled={isLoading}
            type='button'
            onClick={onClick}
        >
            {isLoading ? (
                <AiOutlineLoading
                    className={cn('animate-spin')}
                    fontSize={18}
                />
            ) : (
                <TrailingWidget fontSize={18} />
            )}
            <span>{text}</span>
        </button>
    );
}
