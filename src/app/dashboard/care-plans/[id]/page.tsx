import React from 'react';
import { CarePlan } from '@/components/dashboard/care-plans';

interface CarePlanProps {
    params: {
        id: string
    };
}

const page = async ({ params }: CarePlanProps) => {
    const { id } = await params;
    return <CarePlan id={id} />
};

export default page;