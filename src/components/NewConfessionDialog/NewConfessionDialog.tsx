import cn from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';
import { useSession } from '../../hooks/useSession';
import Image from 'next/image';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { useMutation } from 'react-query';
import { Dispatch, SetStateAction, useRef } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { createPortal } from 'react-dom';
import { useClickAwayListener } from '../../hooks/ClickAwayListener';

interface NewConfessionDialogProps {
    setShowDialog: Dispatch<SetStateAction<boolean>>;
    showDialog: boolean;
}
export function NewConfessionDialog({
    setShowDialog,
    showDialog,
}: NewConfessionDialogProps) {
    const [session] = useSession();
    const dialogFormRef = useRef<HTMLFormElement>(null);
    const mutation = useMutation((data: { description: string }) => {
        return fetch('/api/confession/create', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    });

    useClickAwayListener(() => {
        setShowDialog(false);
    }, dialogFormRef);

    if (!showDialog) return null;

    const content = (
        <ReactFocusLock>
            <form
                ref={dialogFormRef}
                className={cn(
                    'max-w-xl w-full border absolute shadow-lg rounded-lg',
                    'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white'
                )}
                onSubmit={async (event) => {
                    event.preventDefault();
                    const description = (
                        (event.target as any).input as HTMLInputElement
                    ).value;
                    mutation.mutate({ description });
                }}
            >
                <div className={cn('flex items-center px-4 py-2.5')}>
                    <h2 className={cn('font-bold text-lg flex-1 text-center')}>
                        Create confession
                    </h2>
                    <button
                        className={cn(
                            'bg-gray-200 rounded-full p-2 box-content',
                            'hover:bg-gray-300'
                        )}
                        type='button'
                        onClick={() => {
                            setShowDialog(false);
                        }}
                    >
                        <AiOutlineClose fontSize={18} />
                    </button>
                </div>
                <hr />
                <div className='flex items-center font-semibold px-4 py-2.5 space-x-2'>
                    <button className={cn('hover:opacity-90')} type='button'>
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
                            'border py-1 px-3 rounded-xl flex items-center'
                        )}
                        type='button'
                    >
                        {/*  @ts-ignore */}
                        <span> {session?.user?.name} </span>
                        <RiArrowDropDownFill fontSize={18} />
                    </button>
                </div>
                <textarea
                    autoFocus
                    required
                    className={cn(
                        'w-full outline-none px-4 min-h-[100px] py-2.5 max-h-[300px] resize-none'
                    )}
                    name='input'
                    placeholder='I want to confess that...'
                    onInput={(element) => {
                        const target = element.target as HTMLInputElement;
                        if (target.scrollHeight < 300) {
                            target.style.height = 'auto';
                            target.style.height = target.scrollHeight + 'px';
                        }
                    }}
                />
                <div className={cn('flex justify-end px-4 py-2.5')}>
                    <button
                        className={cn(
                            'bg-blue-600 text-white py-1.5 px-2.5 rounded-lg text-sm'
                        )}
                        type='submit'
                    >
                        Create
                    </button>
                </div>
            </form>
        </ReactFocusLock>
    );

    return document.body ? createPortal(content, document.body) : null;
}
