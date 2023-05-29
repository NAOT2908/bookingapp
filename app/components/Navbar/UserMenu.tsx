'use client'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/UseRegisterModal';

const UserMenu = () => {
    const registerModal = useRegisterModal();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = useCallback(() => {
        setIsOpen((value) => !value);

    },[]);
    const handclick = useCallback(() => {
        setIsOpen(false);

    },[]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={() => { }}
                    className="
                hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer
                " 
                
                >
                    HOME
                </div>
                <div
                    onClick={toggleMenu}
                    className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-100
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                transition
                hover:shadow-md
                "
                >
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className='absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
                '> 
                <div className='flex flex-col cursor-pointer'></div>
                    <>
                        <MenuItem  onclick={() => {}}
                        label='Login'
                        />
                        <MenuItem  onclick={registerModal.onOpen}
                        
                        label='Sign up' />
                    </>
                </div>
            )}

        </div>
    );
}

export default UserMenu; 