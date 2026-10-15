"use client";
import React, { useState, type ReactNode } from 'react'
import Header from '../header/header';
import Navigation from '../navigation/navigation';

interface DashboardShellProps {
    children: ReactNode
}
const DashboardShell = ({ children }: DashboardShellProps) => {
    const [responsiveMenu, setResponsiveMenu] = useState<boolean>(false);
    return (
        <main className='grid lg:grid-cols-5 min-h-screen max-lg:relative bg-gradient-to-br from-teal-200 via-white to-blue-200'>
            <Navigation responsiveMenu={responsiveMenu} setResponsiveMenu={setResponsiveMenu} />
            <div className='lg:col-span-4'>
                <Header setResponsiveMenu={setResponsiveMenu} />
                <div className='p-5 md:p-6'>
                    {children}
                </div>
            </div>
        </main>
    )
}

export default DashboardShell;