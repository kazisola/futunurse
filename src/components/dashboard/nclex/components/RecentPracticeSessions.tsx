import { IRecentSession } from '@/types/NCLEX';
import { ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' });

const scoreConfig = (score: number) => {
    if (score >= 70) return { badge: 'bg-emerald-50 text-emerald-600 border-emerald-100', dot: 'bg-emerald-500' };
    if (score >= 40) return { badge: 'bg-amber-50 text-amber-600 border-amber-100',       dot: 'bg-amber-400'  };
    return              { badge: 'bg-rose-50 text-rose-500 border-rose-100',               dot: 'bg-rose-400'   };
};

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-10 gap-4">
        <div className="bg-blue-50 border border-blue-100 rounded-full p-3">
            <Clock size={22} className="text-blue-400" />
        </div>
        <div className="text-center">
            <p className="text-sm font-semibold text-slate-600">No sessions yet</p>
            <p className="text-xs text-gray-400 mt-1 max-w-[200px] leading-relaxed">
                Complete a practice session to start tracking your performance history
            </p>
        </div>
        <Link
            href="/dashboard/nclex/categories"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
            Start practicing <ChevronRight size={13} className="relative top-px" />
        </Link>
        <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-1.5 rounded-full bg-blue-100"
                    style={{ width: `${[24, 16, 32, 20, 28][i]}px` }} />
            ))}
        </div>
    </div>
);

const RecentPracticeSessions = ({ recentPracticeSessions }: { recentPracticeSessions: IRecentSession[] }) => {
    const hasData = recentPracticeSessions.length > 0;

    const avg = hasData
        ? Math.round(recentPracticeSessions.reduce((s, i) => s + i.score, 0) / recentPracticeSessions.length)
        : null;
    const total = hasData
        ? recentPracticeSessions.reduce((s, i) => s + i.totalQuestions, 0)
        : null;

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-5">
                <div className="min-w-0">
                    <h4 className="flex items-center gap-2 font-semibold text-slate-800">
                        <Clock size={18} className="text-blue-600 shrink-0" />
                        <span className="truncate">Recent Practice Sessions</span>
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">Your latest NCLEX practice history</p>
                </div>
                {hasData && (
                    <div className="flex gap-3 shrink-0">
                        <div className="text-right">
                            <p className="text-xs text-gray-400">Avg</p>
                            <p className="text-sm font-semibold text-slate-800">{avg}%</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-400">Total</p>
                            <p className="text-sm font-semibold text-slate-800">{total}</p>
                        </div>
                    </div>
                )}
            </div>

            {hasData ? (
                <ul className="space-y-2 max-h-96 overflow-auto pr-0.5">
                    {recentPracticeSessions.map((item, index) => {
                        const cfg = scoreConfig(item.score);
                        return (
                            <li
                                key={index}
                                className="flex items-center justify-between gap-2 px-3 sm:px-4 py-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-colors duration-150"
                            >
                                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                    <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
                                    <div className="min-w-0">
                                        <p className="text-xs sm:text-sm font-semibold text-slate-700 capitalize truncate">
                                            {item.category}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">{formatDate(item.date)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <p className="text-xs text-gray-400 hidden sm:block">
                                        {item.correctAnswers}/{item.totalQuestions}
                                    </p>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${cfg.badge}`}>
                                        {item.score.toFixed(0)}%
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <EmptyState />
            )}

            {hasData && (
                <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5 mt-4 pt-3 border-t border-gray-100">
                    {[
                        { dot: 'bg-emerald-500', label: 'Proficient ≥70%' },
                        { dot: 'bg-amber-400',   label: 'Developing ≥40%' },
                        { dot: 'bg-rose-400',    label: 'Needs Work <40%' },
                    ].map(({ dot, label }) => (
                        <span key={label} className="flex items-center gap-1.5 text-xs text-gray-400">
                            <span className={`w-2 h-2 rounded-full inline-block ${dot}`} />
                            {label}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentPracticeSessions;