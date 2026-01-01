"use client";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Download, Plus, Star, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CarePlan from './components/CarePlan';
import { ICarePlan } from '@/types/PatientCarePlan';
import { Skeleton } from '@/components/ui/skeleton';

export const CarePlans = () => {
    const [carePlans, setCarePlans] = useState<ICarePlan[]>([]);
    const [plansLoading, setPlansLoading] = useState<boolean>(true);
    useEffect(() => {
        const handleGetCarePlans = async () => {
            setPlansLoading(true);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/care-plan/get-care-plans`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setPlansLoading(false);
            if (response.status === 200) {
                setCarePlans(response.data?.carePlans);
            }
        };
        handleGetCarePlans();
    }, []);
    const [starred_plans, set_starred_plans] = useState<ICarePlan[]>([])
    useEffect(() => {
        const handleGetStarredCarePlans = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/care-plan/star-care-plan`);
            if (response.status === 200) {
                set_starred_plans(response.data?.starred_plans)
            }
        };
        handleGetStarredCarePlans();
    }, []);
    return (
        <div className='space-y-8'>

            {plansLoading ? (
                <>
                    <div className='flex items-start md:justify-between max-md:flex-col gap-8'>
                        <div className='w-full'>
                            <Skeleton className='w-72 h-10 mb-2' />
                            <Skeleton className='w-120 h-5' />
                            <div className='flex items-center gap-4 mt-4'>
                                <Skeleton className='w-28 h-6' />
                                <Skeleton className='w-28 h-6 ' />
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Skeleton className='w-40 h-11' />
                            <Skeleton className='w-40 h-11 ' />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                        {
                            Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="h-44"
                                />
                            ))
                        }
                    </div>
                </>
            ) : carePlans.length > 0 ? (
                <>
                    <div className='flex md:justify-between max-md:flex-col max-md:gap-8'>
                        <div>
                            <h2 className='font-bold text-3xl text-gray-800 mb-1'>Care Plans Library</h2>
                            <p className='text-gray-700 mb-3'>AI-powered nursing care plans with evidence-based practice and NANDA/NIC/NOC integration</p>
                            <div className='flex items-center gap-4'>
                                <p className='flex items-center gap-1 text-gray-500 text-sm'><Stethoscope size={16} /> {carePlans.length} total plans</p>
                                <p className='flex items-center gap-1 text-gray-500 text-sm'><Star size={16} />{starred_plans.length} starred</p>
                            </div>
                        </div>
                        <div className='flex max-md:items-center gap-2'>
                            <Button size={'lg'} variant={'outline'} className='flex-1 border-teal-600 text-teal-600 hover:bg-transparent hover:text-teal-600'><Download size={18} /> Export all</Button>
                            <Button size={'lg'} className='flex-1'><Link href="/dashboard/care-plans/new" className='flex items-center gap-2'><Plus size={18} /> New care plan</Link></Button>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                        {carePlans.map((plan, index) => (
                            <CarePlan key={index} carePlan={plan} starred={starred_plans.some(starred => starred._id === plan._id)} />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className='flex md:justify-between max-md:flex-col max-md:gap-8'>
                        <div>
                            <h2 className='font-bold text-3xl text-gray-800 mb-1'>Care Plans Library</h2>
                            <p className='text-gray-700 mb-3'>AI-powered nursing care plans with evidence-based practice and NANDA/NIC/NOC integration</p>
                            <div className='flex items-center gap-4'>
                                <p className='flex items-center gap-1 text-gray-500 text-sm'><Stethoscope size={16} /> {carePlans.length} total plans</p>
                                <p className='flex items-center gap-1 text-gray-500 text-sm'><Star size={16} />{starred_plans.length} starred</p>
                            </div>
                        </div>
                        <div className='flex max-md:items-center gap-2'>
                            <Button size={'lg'} variant={'outline'} className='flex-1 border-teal-600 text-teal-600 hover:bg-transparent hover:text-teal-600'><Download size={18} /> Export all</Button>
                            <Button size={'lg'} className='flex-1'><Link href="/dashboard/care-plans/new" className='flex items-center gap-2'><Plus size={18} /> New care plan</Link></Button>
                        </div>
                    </div>
                    {/* <div className="flex flex-col justify-center items-center py-8">
                        <Stethoscope size={96} className="text-gray-600" />
                        <h3 className="font-bold text-xl text-gray-800 mt-6">No Care Plan in the Library</h3>
                        <p className="text-gray-600">
                            You have no care plans made. Create a new care plan to get started
                        </p>
                    </div> */}
                    <div className="mt-6 relative flex flex-col items-center justify-center text-center rounded-lg border border-dashed border-gray-200 bg-gray-50/60 p-8 overflow-hidden">
                        <span className="absolute inset-0 rounded-lg animate-pulse bg-teal-500/5" />

                        <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 mb-4">
                            <Stethoscope className="text-teal-600" size={22} />
                        </div>

                        <h3 className="relative text-gray-900 font-semibold text-lg">
                            No Care Plan Data Yet
                        </h3>

                        <p className="relative text-gray-600 text-sm mt-1 max-w-sm">
                            Create care plans using our AI-Powered patient care plan generator to view them
                        </p>

                        <Link href={'/dashboard/care-plans/new'}
                            className="relative mt-5 inline-flex items-center gap-2 rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition cursor-pointer"
                        >
                            Create care plan
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};