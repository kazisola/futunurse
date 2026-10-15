import React, { type ReactNode } from 'react';
import type { Metadata } from 'next';
import DashboardShell from '@/components/dashboard/dashboard/dashboard-shell';

interface LayoutProps {
    children: ReactNode;
}

export const metadata: Metadata = {
    title: "Dashboard | Futunurse",
    description: "Your AI-powered bridge from the classroom to the clinic. Smart Care Plans, NCLEX prep, and clinical confidence."
}

const DashboardLayout = ({ children }: LayoutProps) => {
    return <DashboardShell>{children}</DashboardShell>
};

export default DashboardLayout;