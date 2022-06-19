import cn from 'classnames';
import { IconBaseProps } from 'react-icons';

interface SocialLoginButtonProps {
    TrailingWidget: (props: IconBaseProps) => JSX.Element;
    text: string;
}

export function SocialLoginButton({
    TrailingWidget,
    text,
}: SocialLoginButtonProps) {
    return (
        <button
            className={cn(
                'border px-5 py-2 shadow hover:shadow-xl text-white rounded-md',
                'transition-shadow duration-300',
                'active:shadow',
                'flex items-center space-x-3'
            )}
            type='button'
        >
            <TrailingWidget fontSize={18} />
            <span>{text}</span>
        </button>
    );
}
