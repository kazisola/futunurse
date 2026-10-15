"use client";
import React, { ReactNode } from 'react';
import DashboardShell from '@/components/dashboard/dashboard/dashboard-shell';

interface LayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
    return <DashboardShell>{ children }</DashboardShell>
};

export default DashboardLayout;