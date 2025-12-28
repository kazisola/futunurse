"use client";
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import React from 'react';

const Profile = () => {
    return (
        <div>
            <Button onClick={() => signOut({ callbackUrl: '/' })} className='w-full flex items-center justify-center bg-red-500/70 hover:bg-red-500/80 duration-150 ease-in-out h-12 rounded-lg'><LogOut className='' /> Sign Out</Button>
        </div>
    );
};

export default Profile;