'use client'

import axios from 'axios';
import Modal from "./Modals";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/UseRegisterModal";
import useLoginModal from "@/app/hooks/UseLoginModal";
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast'
import Button from '../Button';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
                loginModal.onOpen();
                toast.success('Success!')
            })
            .catch((err) => {
                toast.error('No No No'); 
            })
            .finally(() => {
                setIsLoading(false);
            })

    }
    const onToggle = useCallback(() => {
        loginModal.onOpen();
        registerModal.onClose();
      }, [loginModal, registerModal])
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            
            <Heading title='Hello' subtitle='Create an account'/>
            <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
        </div>
    )

    const footerContent = (
        
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button 
                outline
                label='Continue with GitHub'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex text-center items-center flex-row justify-center gap-2'>
                    <div>
                        Already have an Account?
                    </div>
                    <span onClick={onToggle}
                     className='text-blue-800 cursor-pointer hover:underline '>
                        Log in
                    </span>
                </div>
            </div>
        </div>
        
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
          footer={footerContent}
        />
    );
}

export default RegisterModal;