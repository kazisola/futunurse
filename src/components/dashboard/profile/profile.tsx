"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import UserDetails from './components/UserDetails';
import UserForm from './components/UserForm';
import { IUser } from '@/types/User';

const Profile = () => {
    const [user, setUser] = useState<IUser | null>(null);
    return (
        <div className='space-y-6 lg:w-8/12 mx-auto'>
            <div>
                <h2 className='font-bold text-3xl text-gray-800 mb-1'>Your profile</h2>
                <p className='text-gray-700 mb-3'>Manage your personal and academic information</p>
            </div>
            <UserDetails user={user} setUser={setUser} />
            <UserForm user={user} setUser={setUser} />
            <Button onClick={() => signOut({ callbackUrl: '/' })} className='w-full flex items-center justify-center bg-red-500/80 hover:bg-red-500/90 duration-150 ease-in-out h-12 rounded-lg'><LogOut className='' /> Sign Out</Button>
        </div>
    );
};

export default Profile;