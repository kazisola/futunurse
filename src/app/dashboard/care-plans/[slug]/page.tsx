import React from 'react';
import { CarePlan } from "@/components/dashboard/care-plans";

interface CarePlanProps {
    params: {
        slug: string
    };
}

const CarePlanPage = async ({ params }: CarePlanProps) => {
    const { slug } = params;
    return (
        <CarePlan id={slug} />
    );
};

export default CarePlanPage;