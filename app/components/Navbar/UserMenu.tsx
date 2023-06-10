'use client'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/UseRegisterModal';
import LoginModal from '../modals/LoginModal';
import useLoginModal from '@/app/hooks/UseLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/UseRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser?: SafeUser | null,
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {

    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = useCallback(() => {
        setIsOpen((value) => !value);

    }, []);

    

    const onRent = useCallback(() => {
        if(!currentUser){
            loginModal.onOpen();
        }
        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
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
                lg:px-6
                rounded-full
                cursor-pointer
                transition
                hover:shadow-md
                "
                >
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar src={currentUser?.image} />
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
                cursor-pointer
                right-0
                top-12
                text-sm
                '>
                    <div className='flex flex-col cursor-pointer'></div>
                    {currentUser ? (
                        <>
                            <MenuItem onclick={rentModal.onOpen}
                                label='Home'
                            />
                            <MenuItem onclick={() => {
                                router.push('/trips');
                                setIsOpen(false);
                            }}
                                label='My Trips'
                            />
                            <MenuItem onclick={() => {
                                router.push('/favorites');
                                setIsOpen(false);
                             }}
                                label='My Favorites'
                            />
                            <MenuItem onclick={() => {
                                router.push('/reservations');
                                setIsOpen(false);
                             }}
                                label='My Reservations'
                            />
                            <MenuItem onclick={() => { 
                                router.push('/properties');
                                setIsOpen(false);
                             }}
                                label='My Properties'
                            />
                            <hr />
                            <MenuItem onclick={() => {
                                signOut();
                                setIsOpen(false);
                            }}
                                label='Logout'
                            />
                        </>
                    ) : (
                        <>
                            <MenuItem onclick={loginModal.onOpen}
                                label='Login'
                            />
                            <MenuItem onclick={registerModal.onOpen}
                                label='Sign up' />
                        </>
                    )}
                </div>
            )}

        </div>
    );
}

export default UserMenu; 