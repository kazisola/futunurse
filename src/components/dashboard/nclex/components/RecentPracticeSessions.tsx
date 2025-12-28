import { Skeleton } from '@/components/ui/skeleton';
import { IRecentSession } from '@/types/NCLEX';
import axios from 'axios';
import { Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const RecentPracticeSessions = () => {
    const [recentPracticeSessions, setRecentPracticeSessions] = useState<IRecentSession[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const handleGetRecentSessions = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/nclex/recent-sessions`);
                if (res.status === 200) {
                    setRecentPracticeSessions(res.data?.recentSessions);
                }
                setLoading(false)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        handleGetRecentSessions();
    }, [])
    return (
        <>
            {loading ?
                (
                    <Skeleton className='bg-gray-900/10 w-full h-52 rounded-md' />
                )
                :
                (
                    <div className='bg-white border border-gray-200/30 rounded-lg p-5'>
                        <h2 className='text-gray-900 font-medium text-lg flex items-center gap-2'><Clock size={20} className='text-blue-600/90' /> Recent Practice Sessions</h2>
                        {
                            recentPracticeSessions.length > 0 ?
                                <ul className="mt-5 divide-y divide-gray-200/40 rounded-xl border border-gray-200/40 bg-white max-h-96 overflow-auto">
                                    {recentPracticeSessions.map((item, index) => {
                                        const scoreColor =
                                            item.score >= 70
                                                ? 'text-green-500'
                                                : item.score >= 40
                                                    ? 'text-yellow-500'
                                                    : 'text-red-500';

                                        return (
                                            <li
                                                key={index}
                                                className="flex items-center justify-between px-5 py-3 transition hover:bg-gray-50/60"
                                            >

                                                <div className="space-y-0.5">
                                                    <h5 className="font-medium text-gray-900 capitalize">
                                                        {item.category}
                                                    </h5>
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(item.date).toLocaleDateString('en-US', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        })}
                                                    </p>
                                                </div>

                                                <div className="text-right space-y-0.5">
                                                    <p className={`max-sm:text-sm font-medium ${scoreColor}`}>
                                                        {item.score.toFixed(0)}%
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {item.correctAnswers} of {item.totalQuestions}
                                                    </p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>

                                :
                                <div className="mt-6 relative flex flex-col items-center justify-center text-center rounded-lg border border-dashed border-gray-200 bg-gray-50/60 p-8 overflow-hidden">
                                    <span className="absolute inset-0 rounded-lg animate-pulse bg-blue-500/5" />

                                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                                        <Clock className="text-blue-600" size={22} />
                                    </div>

                                    <h3 className="relative text-gray-900 font-semibold text-lg">
                                        No Practice Sessions Yet
                                    </h3>

                                    <p className="relative text-gray-600 text-sm mt-1 max-w-sm">
                                        You haven&apos;t completed any NCLEX practice sessions yet. Start a session to track your progress and performance here.
                                    </p>

                                    <button
                                        className="relative mt-5 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                                    >
                                        Start Practice
                                    </button>
                                </div>

                        }
                    </div>
                )
            }
        </>
    );
};

export default RecentPracticeSessions;