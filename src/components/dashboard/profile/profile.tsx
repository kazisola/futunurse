"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import UserDetails from './components/UserDetails';
import UserForm from './components/UserForm';
import LoadingState from './components/LoadingState';
import { ToastContainer } from 'react-toastify';
import { useGetUserQuery } from '@/redux/services/userApi';

const Profile = () => {
    const { data, isLoading: userLoading, isError } = useGetUserQuery()

    if (userLoading) {
        return <LoadingState />
    }
    
    return (
        <div className='space-y-6 lg:w-8/12 mx-auto'>
            <div>
                <h2 className='font-bold text-3xl text-gray-800 mb-1'>Your profile</h2>
                <p className='text-gray-700'>Manage your personal and academic information</p>
            </div>
            <UserDetails user={data?.user} />
            <UserForm user={data?.user} />
            <Button onClick={() => signOut({ callbackUrl: '/' })} className='w-full flex items-center justify-center bg-red-500/90 hover:bg-red-500 duration-150 ease-in-out h-12 rounded-lg'><LogOut className='' /> Sign Out</Button>
            <ToastContainer />
        </div>
    );
};

export default Profile;