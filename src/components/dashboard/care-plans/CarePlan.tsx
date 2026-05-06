"use client";
import { ICarePlan } from '@/types/PatientCarePlan';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Diagnoses from './components/Diagnoses';
import PatientInformation from './components/PatientInformation';
import { Download, PencilLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface CarePlanProps {
    slug: string;
}

export const CarePlan = ({ slug }: CarePlanProps) => {
    const [carePlan, setCarePlan] = useState<ICarePlan | null>(null);
    const [planLoading, setPlanLoading] = useState<boolean>(true);
    useEffect(() => {
        setPlanLoading(true);
        const handleGetCarePlan = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/care-plans/${slug}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setPlanLoading(false);
            if (response.status === 200) {
                setCarePlan(response.data?.carePlan || null)
            }
        };
        handleGetCarePlan();
    }, [slug]);
    return (
        <>
            {planLoading ?
                (
                    <div className='space-y-5'>
                        <div className='md:flex items-start justify-between gap-10 max-md:space-y-3'>
                            <Skeleton className='bg-slate-200 h-10 max-md:h-20 w-full rounded-md' />
                            <div className='flex items-center gap-2'>
                                <Skeleton className='bg-slate-200 h-10 w-32 max-md:w-full rounded-md' />
                                <Skeleton className='bg-slate-200 h-10 w-32 max-md:w-full rounded-md' />
                            </div>
                        </div>
                        <Skeleton className='bg-slate-200 h-96 w-full rounded-md' />
                        <Skeleton className='bg-slate-200 h-[30rem] w-full rounded-md' />
                    </div>
                )
                :
                (
                    <div>
                        <div className='flex items-start justify-between max-md:flex-col gap-3'>
                            <div>
                                <h3 className='mb-1 font-bold text-3xl text-gray-800 flex items-center gap-3'>{carePlan?.patient.name}
                                </h3>
                                <p className='text-gray-600'>{carePlan?.patient.primaryDiagnoses} with the physical findings of {carePlan?.patient.physicalFindings?.slice(0, 25) || 'N/A'}...</p>
                            </div>
                            <div className='space-x-2 max-sm:w-full max-sm:grid max-sm:grid-cols-2 max-sm:gap-2'>
                                <Button size={'lg'} variant={'outline'} className='max-sm:w-full border-teal-600 text-teal-600 hover:bg-transparent hover:text-teal-600'><Download size={18} /> Export Now</Button>
                                <Button size={'lg'} className='max-sm:w-full sm:!w-40'><PencilLine size={20} /> Edit Care Plan</Button>
                            </div>
                        </div>
                        {carePlan?.patient && <PatientInformation patient={carePlan.patient} />}
                        <div>
                            <h2 className='font-bold text-2xl text-gray-800'>AI-Powered Diagnoses</h2>
                            <p className='text-gray-700 mb-5'>Students are encouraged to review and edit the care plan as needed</p>
                            <Diagnoses diagnoses={carePlan?.diagnoses ?? []} />
                        </div>
                    </div>
                )
            }
        </>
    );
};