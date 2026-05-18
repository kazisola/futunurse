"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import UserDetails from './components/UserDetails';
import UserForm from './components/UserForm';
import { IUser } from '@/types/User';
import axios from 'axios';
import LoadingState from './components/LoadingState';

const Profile = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const handleGetUser = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/user`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (response.status === 200) {
                    setUser(response.data?.user)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        handleGetUser();
    }, []);

    if(loading) {
        return <LoadingState />
    }
    return (
        <div className='space-y-6 lg:w-8/12 mx-auto'>
            <div>
                <h2 className='font-bold text-3xl text-gray-800 mb-1'>Your profile</h2>
                <p className='text-gray-700'>Manage your personal and academic information</p>
            </div>
            <UserDetails user={user} />
            <UserForm user={user} />
            <Button onClick={() => signOut({ callbackUrl: '/' })} className='w-full flex items-center justify-center bg-red-500/80 hover:bg-red-500/90 duration-150 ease-in-out h-12 rounded-lg'><LogOut className='' /> Sign Out</Button>
        </div>
    );
};

export default Profile;