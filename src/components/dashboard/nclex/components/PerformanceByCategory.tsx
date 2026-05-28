import { PerformanceCategorized } from '@/types/NCLEX';
import { BarChart3, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const accuracyConfig = (accuracy: number) => {
    if (accuracy >= 70) return { badge: 'bg-emerald-50 text-emerald-600 border-emerald-100', bar: 'bg-emerald-500' };
    if (accuracy >= 40) return { badge: 'bg-amber-50 text-amber-600 border-amber-100',       bar: 'bg-amber-400'  };
    return                      { badge: 'bg-rose-50 text-rose-500 border-rose-100',          bar: 'bg-rose-400'   };
};

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-10 gap-4">
        <div className="bg-blue-50 border border-blue-100 rounded-full p-3">
            <BarChart3 size={22} className="text-blue-400" />
        </div>
        <div className="text-center">
            <p className="text-sm font-semibold text-slate-600">No category data yet</p>
            <p className="text-xs text-gray-400 mt-1 max-w-[200px] leading-relaxed">
                Complete practice questions to see accuracy broken down by NCLEX domain
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

const PerformanceByCategory = ({ performance_categorized }: { performance_categorized: PerformanceCategorized[] }) => {
    const hasData = performance_categorized.length > 0;
    const avg = hasData
        ? Math.round(performance_categorized.reduce((s, i) => s + i.accuracy, 0) / performance_categorized.length)
        : null;
    const best = hasData
        ? performance_categorized.reduce((a, b) => a.accuracy > b.accuracy ? a : b)
        : null;

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-5">
                <div className="min-w-0">
                    <h4 className="flex items-center gap-2 font-semibold text-slate-800">
                        <BarChart3 size={18} className="text-blue-600 shrink-0" />
                        <span className="truncate">Performance by Category</span>
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">Accuracy breakdown by NCLEX domain</p>
                </div>
                {hasData && (
                    <div className="flex gap-3 shrink-0">
                        <div className="text-right">
                            <p className="text-xs text-gray-400">Avg</p>
                            <p className="text-sm font-semibold text-slate-800">{avg}%</p>
                        </div>
                        {best && (
                            <div className="text-right">
                                <p className="text-xs text-gray-400">Best</p>
                                <p className="text-sm font-semibold text-emerald-500">{best.accuracy.toFixed(0)}%</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {hasData ? (
                <ul className="space-y-3.5 max-h-96 overflow-auto pr-0.5">
                    {performance_categorized.map((item, index) => {
                        const cfg = accuracyConfig(item.accuracy);
                        return (
                            <li key={index}>
                                <div className="flex items-center justify-between gap-2 mb-1.5">
                                    <div className="flex items-center gap-2 min-w-0 flex-1">
                                        <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.bar}`} />
                                        <span className="text-xs sm:text-sm font-semibold text-slate-700 capitalize truncate">
                                            {item.category}
                                        </span>
                                        <span className="text-xs text-gray-400 shrink-0 hidden sm:inline">
                                            {item.totalQuestions}q
                                        </span>
                                    </div>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border shrink-0 ${cfg.badge}`}>
                                        {item.accuracy.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${cfg.bar} transition-all duration-500`}
                                        style={{ width: `${item.accuracy}%` }}
                                    />
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

export default PerformanceByCategory;