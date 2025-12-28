"use client";
import { Calendar, Zap } from 'lucide-react';
import React from 'react';
import QuickInsights from './components/QuickInsights';
import Features from './components/Features';
import NclexPerformance from './components/NclexPerformance';
import WeekInsight from './components/WeekInsight';
import AISuggestions from './components/AISuggestions';
import StrengthsRadar from './components/StrengthsRadar';
import AvgTimeChart from './components/AvgTimeChart';
import { useGetDashboard } from '@/hooks/useGetDashboard';
import LoadingDashboard from './components/loadingDashboard';

interface DashboardProps {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        id?: string | null;
    }
}

export const Dashboard = ({ user }: DashboardProps) => {
    const today = new Date();
    const { dashboardData, loading } = useGetDashboard();
    console.log(dashboardData);
    if (loading || !dashboardData) return <LoadingDashboard />;
    return (
        <div className='space-y-5 max-sm:space-y-3'>
            <div className='mb-10 max-sm:mb-8 rounded-md w-full flex max-md:flex-col max-md:gap-3 md:items-center justify-between'>
                <div>
                    <h1 className='font-semibold text-3xl text-gray-800 mb-2'>Welcome back, {user?.name}!</h1>
                    <p className='flex items-center gap-2 text-gray-600'><Calendar size={15} /> {today.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })} • Track your progress</p>
                </div>
                {/* <div className='max-md:hidden text-white bg-linear-to-b bg-cyan-500 to-10% flex items-center gap-3 rounded-md text-xs px-3 py-2 font-medium'><Zap size={16} /> Pro Trial - 14 days remaining</div> */}
            </div>
            <QuickInsights quickInsights={dashboardData} />
            <div className='md:grid grid-cols-3 gap-5 max-sm:space-y-5'>
                <div className='col-span-2 space-y-5'>
                    <Features />
                    <NclexPerformance nclexTrend={dashboardData?.nclexTrend} />
                    <div className='grid md:grid-cols-2 gap-5'>
                        <AvgTimeChart />
                        <StrengthsRadar strength={dashboardData?.performanceByCategory} />
                    </div>
                </div>
                <div className='col-span-1 space-y-5'>
                    <AISuggestions ai_suggestions={dashboardData?.suggestions} />
                    <WeekInsight weekInsight={{ carePlans: dashboardData?.carePlans?.number_of_week_care_plans, completedQuestions: dashboardData?.nclexInsights?.week_completed_questions }} />
                </div>
            </div>
        </div>
    );
};