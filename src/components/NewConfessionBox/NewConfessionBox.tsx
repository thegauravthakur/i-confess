import cn from 'classnames';
import Image from 'next/image';
import { useSession } from '../../hooks/useSession';
import { useState } from 'react';
import { NewConfessionDialog } from '../NewConfessionDialog';

export function NewConfessionBox() {
    const [session] = useSession();
    const [showDialog, setShowDialog] = useState(false);
    return (
        <div className={cn('flex space-x-3 bg-white p-5 rounded-lg shadow')}>
            <button
                className={cn('hover:opacity-90')}
                type='button'
                onClick={() => {}}
            >
                <Image
                    alt='profile avatar'
                    className={cn('rounded-full')}
                    height={42}
                    src={session?.user?.avatar ?? ''}
                    width={42}
                />
            </button>
            <button
                className={cn(
                    'p-2.5 border w-full rounded-3xl',
                    'text-start text-gray-500 bg-gray-100'
                )}
                title='I want to confess that'
                type='button'
                onClick={() => {
                    setShowDialog(true);
                }}
            >
                I want to confess that...
            </button>
            <NewConfessionDialog
                setShowDialog={setShowDialog}
                showDialog={showDialog}
            />
        </div>
    );
}
