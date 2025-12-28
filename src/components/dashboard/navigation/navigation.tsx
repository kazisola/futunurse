"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Book, Home, LogOut, Stethoscope, User, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, redirect } from 'next/navigation';
import React, { Dispatch, SetStateAction, useEffect } from 'react';

interface NavigationProps {
    responsiveMenu: boolean;
    setResponsiveMenu: Dispatch<SetStateAction<boolean>>
}

const Navigation = ({ responsiveMenu, setResponsiveMenu }: NavigationProps) => {
    const navs = [
        { name: 'Dashboard', href: '/dashboard', icon: <Home size={20} /> },
        { name: 'Care Plans', href: '/dashboard/care-plans', icon: <Stethoscope size={20} /> },
        { name: 'NCLEX Coach', href: '/dashboard/nclex', icon: <Book size={20} /> },
        // { name: 'Profile', href: '/dashboard/profile', icon: <User size={20} /> },
    ]
    useEffect(() => {
        if (responsiveMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [responsiveMenu])
    const pathname = usePathname();
    const { data } = useSession();
    const user = data?.user;
    const userNameAbbr = user?.name ? user.name.split(' ').map(n => n[0]).join('') : "G";
    const handleClickProfile = () => {
        setResponsiveMenu(false)
        redirect("/dashboard/profile")
    }
    return (
        <nav className={`lg:col-span-1 p-4 max-h-screen sticky top-0 left-0 bg-teal-600 flex flex-col justify-between items-start
    max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:h-full max-lg:z-20
    ${responsiveMenu ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'} 
    transition-transform duration-300 md:rounded-r-3xl`}>
            <div className='w-full'>
                <div className='flex items-center justify-between pb-5 mb-5 border-b border-teal-500/50'>
                    <>
                        <Link href="/dashboard" className='flex items-center gap-2 text-white'>
                            <div className='bg-teal-700/50 w-10 h-10 rounded-sm flex items-center justify-center'>
                                <Stethoscope size={24} className=' text-white' />
                            </div>
                            <h2 className='font-bold text-2xl'>Futunurse</h2>
                        </Link>
                    </>
                    <button onClick={() => setResponsiveMenu(false)} className='lg:hidden text-white relative top-1'><X size={35} /></button>
                </div>
                <ul className='flex flex-col gap-3 text-white font-medium'>
                    {navs.map((nav, index) => {
                        const isActive = nav.href === pathname;
                        return (
                            <li key={index} onClick={() => setResponsiveMenu(false)} className={`${isActive ? 'bg-teal-500/90' : 'hover:bg-teal-500/30'} w-full rounded-lg px-3 `}>
                                <Link href={nav.href} className='flex items-center gap-2 py-3'>{nav.icon} {nav.name}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <button onClick={handleClickProfile} className='flex items-center gap-3 cursor-pointer w-full bg-teal-700/30 hover:bg-teal-700/50 duration-200 py-2 max-sm:py-3 px-3 rounded-lg'>
                <Avatar className='w-8 h-8'>
                    <AvatarImage src={user?.image as string} />
                    <AvatarFallback>{userNameAbbr}</AvatarFallback>
                </Avatar>
                <h3 className='font-medium text-sm'>{user?.name || "Guest"}</h3>
            </button>
        </nav>
    );
};

export default Navigation;