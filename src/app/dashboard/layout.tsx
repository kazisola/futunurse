import React, { type ReactNode } from 'react';
import type { Metadata } from 'next';
import { MobileNavigation, Navigation } from '@/components/dashboard/navigation/navigation';
import Header from '@/components/dashboard/header/header';

interface LayoutProps {
    children: ReactNode;
}

export const metadata: Metadata = {
    title: "Dashboard | Futunurse",
    description: "Your AI-powered bridge from the classroom to the clinic. Smart Care Plans, NCLEX prep, and clinical confidence."
}

const DashboardLayout = ({ children }: LayoutProps) => {
    return (
        <>
            <main className='grid lg:grid-cols-5 min-h-screen max-lg:relative bg-gradient-to-br from-teal-200 via-white to-blue-200'>
                <div className='hidden lg:block'>
                    <Navigation />
                </div>
                <div className='lg:col-span-4'>
                    <Header />
                    <div className='p-5 md:p-6'>
                        {children}
                    </div>
                </div>
            </main>
            <div className='lg:hidden'>
                <MobileNavigation />
            </div>
        </>
    )
};

export default DashboardLayout;