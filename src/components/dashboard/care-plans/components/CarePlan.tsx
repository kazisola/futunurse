import React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck, Calendar, Clock, Stethoscope, Trash } from 'lucide-react';
import { ICarePlan } from '@/types/PatientCarePlan';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

interface CarePlanProps {
    carePlan: ICarePlan;
}

const CarePlan = ({ carePlan }: CarePlanProps) => {
    const pathname = usePathname();
    const { _id, patient, createdAt, updatedAt, bookmarked } = carePlan || {};

    const handleStartCarePlan = async (id: string) => {
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE}/api/care-plans/${id}/bookmark`);
            console.log("response:", response);
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeletePlan = async () => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE}/api/care-plans/${_id}`);
            console.log(response);
            if (response.status === 200) {
                toast.success("Care plan deleted succesfully!", { autoClose: 1000 });
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete care plan!", { autoClose: 1000 });
        }
    };
    return (
        <div className='w-full bg-white border border-gray-200/30 hover:border-gray-200/50 duration-200 p-5 rounded-md'>
            <div className='sm:flex items-center justify-between gap-3'>
                <h2 className='text-xl font-bold text-gray-800'>
                    {patient.name}
                </h2>
                <div className='space-x-2 max-sm:mt-3'>
                    <span className='font-medium px-2 py-0.5 border rounded-full text-xs'>
                        {patient.specialty}
                    </span>
                    <span className='font-medium px-2 py-0.5 border border-blue-200 bg-blue-500/10 text-blue-600 rounded-full text-xs'>
                        {carePlan.diagnoses?.length} Diagnoses
                    </span>
                </div>
            </div>
            <p className='text-gray-800 my-2'>{patient.primaryDiagnoses}</p>
            <div className='flex sm:items-center gap-8 max-sm:flex-col max-sm:gap-2'>
                <p className='text-sm text-gray-500 flex items-center gap-2'><Calendar size={16} /> Created {new Date(createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                <p className='text-sm text-gray-500 flex items-center gap-2'><Clock size={16} /> Updated {new Date(updatedAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            </div>
            <div className='flex gap-2 max-sm:gap-4 mt-6'>
                <Link href={{
                    pathname: `${pathname}/${_id}`,
                    query: {
                        patient: patient.name?.toLowerCase(),
                        specialty: patient.specialty?.toLowerCase()
                    }
                }} className='max-sm:flex-1'>
                    <Button className='w-40'><Stethoscope size={18} /> View Details</Button>
                </Link>
                <Button onClick={() => typeof _id === 'string' && handleStartCarePlan(_id)} className='bg-transparent max-md:border border-teal-500/30 text-gray-700 hover:text-teal-500 hover:bg-teal-500/20'>
                    {bookmarked ?
                        <BookmarkCheck size={18} className='text-teal-500' />
                        :
                        <Bookmark size={18} className='text-teal-500/80' />
                    }
                </Button>
                <Button onClick={handleDeletePlan} className='rounded-md bg-transparent max-md:border border-red-500/30 text-red-500/80 hover:text-red-500 hover:bg-red-500/20'><Trash size={18} /></Button>
            </div>
        </div>
    );
};

export default CarePlan;