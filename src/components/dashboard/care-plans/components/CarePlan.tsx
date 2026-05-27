import React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck, Calendar, Clock, Stethoscope, Trash } from 'lucide-react';
import { ICarePlan } from '@/types/PatientCarePlan';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import { useBookmarkCarePlanMutation, useDeleteCarePlanMutation } from '@/redux/services/carePlanApi';

interface CarePlanProps {
    carePlan: ICarePlan;
}

const CarePlan = ({ carePlan }: CarePlanProps) => {
    const pathname = usePathname();
    const { _id, patient, createdAt, updatedAt, bookmarked } = carePlan || {};

    const [bookmarkCarePlan, { isLoading: bookmarkLoading }] = useBookmarkCarePlanMutation();
    const handleBookmarkCarePlan = async (id: string) => {
        try {
            await bookmarkCarePlan({ id }).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    const [deleteCarePlan, { isLoading: deleteLoading }] = useDeleteCarePlanMutation();
    const handleDeletePlan = async (_id: string) => {
        try {
            await deleteCarePlan({ id: _id }).unwrap();
            toast.success("Care plan deleted successfully!", { autoClose: 1000 });
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete care plan!", { autoClose: 1000 });
        }
    };

    const formatDate = (date: Date) =>
        new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

    return (
        <div className="w-full bg-white border border-gray-100 hover:border-gray-200 duration-200 p-5 rounded-2xl">

            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="">
                    {/* <div className="bg-blue-50 rounded-xl p-2 shrink-0">
                        <Stethoscope size={16} className="text-blue-600" />
                    </div> */}
                    <h2 className="text-base font-bold text-slate-800 truncate">{patient.name}</h2>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-gray-200 text-gray-500">
                        {patient.specialty}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-500 border border-blue-100">
                        {carePlan.diagnoses?.length} Diagnoses
                    </span>
                </div>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed mb-4">{patient.primaryDiagnoses}</p>

            <div className="flex items-center gap-5 mb-5">
                <span className="text-xs text-gray-400 flex items-center gap-1.5">
                    <Calendar size={13} className="shrink-0" />
                    Created {formatDate(createdAt)}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1.5">
                    <Clock size={13} className="shrink-0" />
                    Updated {formatDate(updatedAt)}
                </span>
            </div>

            <div className="border-t border-gray-100 pt-4 flex items-center justify-between gap-2">
                <Link href={{
                    pathname: `${pathname}/${_id}`,
                    query: {
                        patient: patient.name?.toLowerCase(),
                        specialty: patient.specialty?.toLowerCase()
                    }
                }}>
                    <Button className="h-8 px-4 text-sm font-medium rounded-xl gap-1.5">
                        <Stethoscope size={14} /> View Details
                    </Button>
                </Link>

                <div className="flex items-center gap-1.5">
                    <Button
                        onClick={() => typeof _id === 'string' && handleBookmarkCarePlan(_id)}
                        disabled={bookmarkLoading}
                        className="h-8 w-8 p-0 rounded-xl bg-transparent border border-teal-100 hover:bg-teal-50 hover:border-teal-200 text-teal-500 transition-colors duration-200"
                        title={bookmarked ? "Remove bookmark" : "Bookmark"}
                    >
                        {bookmarked
                            ? <BookmarkCheck size={15} className="text-teal-500" />
                            : <Bookmark size={15} className="text-teal-400" />
                        }
                    </Button>
                    <Button
                        onClick={() => handleDeletePlan(_id as string)}
                        disabled={deleteLoading}
                        className="h-8 w-8 p-0 rounded-xl bg-transparent border border-rose-100 hover:bg-rose-50 hover:border-rose-200 text-rose-400 hover:text-rose-500 transition-colors duration-200"
                        title="Delete care plan"
                    >
                        <Trash size={15} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CarePlan;