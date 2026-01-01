import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { PerformanceCategorized } from '@/types/NCLEX';
import axios from 'axios';
import { BarChart3 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const PerformanceByCategory = () => {
    const [performance_categorized, set_performance_categorized] = useState<PerformanceCategorized[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const handleGetCategorizedPerformance = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/nclex/category-performance`);
                if (res.status === 200) {
                    set_performance_categorized(res.data?.performance_categorized);
                }
                setLoading(false);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        handleGetCategorizedPerformance();
    }, []);
    return (
        <>
            {loading ?
                (
                    <Skeleton className='bg-gray-900/10 w-full h-52 rounded-md' />
                )
                :
                (
                    <div className='bg-white border border-gray-200/30 rounded-lg p-5'>
                        <h2 className='text-gray-900 font-medium text-lg flex items-center gap-2'><BarChart3 size={20} className='text-green-600/90' /> Performance by Category</h2>
                        {performance_categorized.length > 0 ?
                            <ul className='space-y-4 mt-5 max-h-96 overflow-auto'>
                                {
                                    performance_categorized.map((item, index) => (
                                        <li key={index} className='space-y-2'>
                                            <div className='flex items-end justify-between'>
                                                <div>
                                                    <h5 className='font-medium text-gray-900 capitalize'>{item.category}</h5>
                                                    <p className='text-gray-600'>{item.totalQuestions} questions completed</p>
                                                </div>
                                                <p className={`text-sm max-sm:text-xs font-medium w-16 max-sm:w-14 py-0.5 text-center rounded-full ${item.accuracy >= 70 ? 'bg-green-500/20 text-green-700' : item.accuracy >= 40 ? 'bg-yellow-500/20 text-yellow-700' : 'bg-red-100 text-red-500'}`}>{item.accuracy.toFixed(2)}%</p>
                                            </div>
                                            <Progress value={item.accuracy} className='' />
                                        </li>
                                    ))
                                }
                            </ul>
                            :
                            <div className="mt-6 relative flex flex-col items-center justify-center text-center rounded-lg border border-dashed border-gray-200 bg-gray-50/60 p-8 overflow-hidden">
                                <span className="absolute inset-0 rounded-lg animate-pulse bg-green-500/5" />

                                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                                    <BarChart3 className="text-green-600" size={22} />
                                </div>

                                <h3 className="relative text-gray-900 font-semibold text-lg">
                                    No Performance Data Yet
                                </h3>

                                <p className="relative text-gray-600 text-sm mt-1 max-w-sm">
                                    Complete practice questions to see your accuracy and progress broken down by NCLEX categories.
                                </p>

                                <Link href={"/dashboard/nclex/categories"}
                                    className="relative mt-5 inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
                                >
                                    Start practicing
                                </Link>
                            </div>

                        }
                    </div>
                )
            }
        </>
    );
};

export default PerformanceByCategory;