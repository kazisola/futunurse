"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookmarkCheck, Download, Plus, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import CarePlan from './components/CarePlan';
import { ICarePlan } from '@/types/PatientCarePlan';
import CarePlansSkeleton from './components/CarePlansSkeleton';
import { useGetCarePlansQuery } from '@/redux/services/carePlanApi';
import { usePathname, useRouter } from 'next/navigation';

export const CarePlans = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { data, isLoading: carePlansLoading } = useGetCarePlansQuery();
    const carePlans = data?.carePlans;

    if (carePlansLoading || !carePlans) {
        return <CarePlansSkeleton />
    }
    const bookmarked_plans: ICarePlan[] = carePlans.filter(item => item.bookmarked);
    return (
        <div className='space-y-8'>

            <div className='flex md:justify-between max-md:flex-col max-md:gap-8'>
                <div>
                    <h2 className='font-bold text-3xl text-gray-800 mb-1'>Care Plans Library</h2>
                    <p className='text-gray-700 mb-3'>AI-powered nursing care plans with evidence-based practice and NANDA/NIC/NOC integration</p>
                    <div className='flex items-center gap-4'>
                        <p className='flex items-center gap-1 text-gray-500 text-sm'><Stethoscope size={16} /> {carePlans.length} total plans</p>
                        <p className='flex items-center gap-1 text-gray-500 text-sm'><BookmarkCheck size={16} />{bookmarked_plans.length} bookmarked</p>
                    </div>
                </div>
                <div className='flex max-md:items-center gap-2'>
                    <Button size={'lg'} variant={'outline'} className='flex-1 rounded-lg border-teal-600 text-teal-600 hover:bg-transparent hover:text-teal-600'><Download size={18} /> Export all</Button>
                    <Button size={'lg'} className='flex-1 rounded-lg' onClick={() => router.push(`${pathname}/new`)}><Plus size={18} /> New care plan</Button>
                </div>
            </div>

            {carePlans.length > 0 ? (
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                    {carePlans.map((plan, index) => (
                        <CarePlan key={index} carePlan={plan} />
                    ))}
                </div>
            ) : (
                <div className="mt-6 relative flex flex-col items-center justify-center text-center rounded-lg border border-dashed border-gray-200 bg-gray-50/60 p-8 overflow-hidden">
                    <span className="absolute inset-0 rounded-lg animate-pulse bg-teal-500/5" />

                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 mb-4">
                        <Stethoscope className="text-teal-600" size={22} />
                    </div>

                    <h3 className="relative text-gray-900 font-semibold text-lg">
                        No care plan yet
                    </h3>

                    <p className="relative text-gray-600 text-sm mt-1 max-w-sm mb-5">
                        Create care plans using our AI-Powered patient care plan generator
                    </p>

                    <Button variant={'outline'} size={'lg'} onClick={() => router.push(`${pathname}/new`)} className='rounded-lg'><Plus size={18} /> Create care plan</Button>
                </div>
            )}
        </div>
    );
};