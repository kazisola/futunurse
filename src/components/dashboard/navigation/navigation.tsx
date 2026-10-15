"use client";
import { Book, Home, Stars, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

const navs = [
    { name: 'Dashboard', href: '/dashboard', icon: <Home size={20} /> },
    { name: 'Care Plans', href: '/dashboard/care-plans', icon: <Stethoscope size={20} /> },
    { name: 'NCLEX', href: '/dashboard/nclex', icon: <Book size={20} /> },
    { name: 'Companion', href: '/dashboard/companion', icon: <Stars size={20} /> },
]

export const Navigation = () => {
    const pathname = usePathname();
    const { data } = useSession();
    const user = data?.user;
    const userNameAbbr = user?.name ? user.name.split(' ').map(n => n[0]).join('') : "G";
    return (
        <nav className={`lg:col-span-1 p-4 sticky top-0 left-0 bg-teal-600 flex flex-col justify-between items-start min-h-screen`}>
            <div className='w-full'>
                <div className='flex items-center justify-between pb-5 mb-5 border-b border-teal-500/50'>
                    <>
                        <Link href="/dashboard" className='flex items-center gap-2 text-white'>
                            <Stethoscope size={25} />
                            <h2 className='font-semibold text-2xl uppercase'>Futunurse</h2>
                        </Link>
                    </>
                </div>
                <ul className='flex flex-col gap-3 text-white font-medium'>
                    {navs.map((nav, index) => {
                        const isActive = nav.href === pathname;
                        return (
                            <li key={index} className={`${isActive ? 'bg-teal-500/90' : 'hover:bg-teal-500/30'} w-full rounded-lg px-3 `}>
                                <Link href={nav.href} className='flex items-center gap-2 py-3'>{nav.icon} {nav.name}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <button onClick={() => redirect("/dashboard/profile")} className='flex items-center gap-3 cursor-pointer w-full bg-teal-700/30 hover:bg-teal-700/50 duration-200 py-2 max-sm:py-3 px-3 rounded-lg'>
                <Avatar className='w-8 h-8'>
                    <AvatarImage src={user?.image as string} />
                    <AvatarFallback>{userNameAbbr}</AvatarFallback>
                </Avatar>
                <h3 className='font-medium text-sm text-white'>{user?.name || "Guest"}</h3>
            </button>
        </nav>

    );
};

export const MobileNavigation = () => {
    const pathname = usePathname();
    return (
        <nav className={`bg-teal-600 fixed bottom-4 left-3 w-[calc(100%-1.5rem)] z-50 py-2.5 px-4 rounded-full`}>
            <ul className='flex justify-between items-center text-white'>
                {navs.map((nav, index) => {
                    const isActive = nav.href === pathname;
                    return (
                        <li key={index} className={`${isActive ? '' : ''} `}>
                            <Link href={nav.href} className='flex flex-col items-center text-center text-sm'>{nav.icon} {nav.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}