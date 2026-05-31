"use client";
import { Button } from '@/components/ui/button';
import { useGetPerformanceByCategoryQuery } from '@/redux/services/nclexApi';
import { NCLEXCategory } from '@/types/NCLEX';
import { BookA, PlayIcon, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import CategoriesSkeleton from './components/CategoriesSkeleton';

const accuracyConfig = (accuracy: number) => {
    if (accuracy >= 70) return { badge: 'bg-emerald-50 text-emerald-600 border border-emerald-100', bar: 'bg-emerald-500', label: 'Proficient' };
    if (accuracy >= 40) return { badge: 'bg-amber-50 text-amber-600 border border-amber-100',       bar: 'bg-amber-400',  label: 'Developing' };
    return                      { badge: 'bg-rose-50 text-rose-500 border border-rose-100',          bar: 'bg-rose-400',   label: 'Needs Work'  };
};

const nclexCategories: NCLEXCategory[] = [
    {
        name: "Mixed Personalized",
        subcategories: ["Safe and Effective Care Environment", "Health Promotion and Maintenance", "Health Promotion and Maintenance", "Psychosocial Integrity", "Physiological Integrity"],
    },
    {
        name: "Safe and Effective Care Environment",
        subcategories: ["Management of Care", "Safety and Infection Control"],
    },
    {
        name: "Health Promotion and Maintenance",
        subcategories: ["Growth and Development", "Health Screening", "Ante/Intra/Postpartum Care"],
    },
    {
        name: "Psychosocial Integrity",
        subcategories: ["Mental Health Concepts", "Therapeutic Communication", "Coping and Adaptation", "End-of-Life Care"],
    },
    {
        name: "Physiological Integrity",
        subcategories: ["Basic Care and Comfort", "Pharmacological Therapies", "Reduction of Risk Potential", "Physiological Adaptation"],
    },
];

export const Categories = () => {
    const { data: performanceData, isLoading: performanceLoading } = useGetPerformanceByCategoryQuery();

    if (performanceLoading || !performanceData) return <CategoriesSkeleton />;

    const performance_categorized = performanceData?.performance_categorized ?? [];

    return (
        <>
            <div className='mb-7'>
                <h2 className='font-bold text-2xl text-gray-800 mb-0.5'>NCLEX Categories</h2>
                <p className='text-gray-700 mb-3'>Choose a category to focus your practice session</p>
            </div>

            <div className='space-y-5'>
                {nclexCategories.map((category, idx) => {
                    const perf = performance_categorized.find(
                        i => i.category.toLowerCase() === category.name.toLowerCase()
                    );
                    const cfg = perf ? accuracyConfig(perf.accuracy) : null;

                    return (
                        <div key={idx} className='bg-white border border-gray-200/30 hover:border-gray-200/50 duration-200 rounded-lg p-5'>

                            <div className='flex items-center gap-4 mb-5'>
                                <div className='max-sm:hidden bg-blue-50 text-blue-600 w-11 h-11 rounded-xl flex items-center justify-center'>
                                    <Stethoscope size={21} />
                                </div>
                                <div>
                                    <h2 className='font-semibold max-sm:font-bold max-sm:text-gray-800 text-lg text-gray-900 mb-0.5'>{category.name}</h2>
                                    <p className='text-gray-400 text-sm normal-case'>{category.subcategories.slice(0, 2).join(", ")}</p>
                                </div>
                            </div>

                            {perf && cfg && (
                                <div className='mb-2'>
                                    <div className='flex items-center justify-between mb-1.5'>
                                        <p className='text-sm text-gray-500'>Progress</p>
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>
                                            {perf.accuracy.toFixed(1)}% · {cfg.label}
                                        </span>
                                    </div>
                                    <div className='h-1.5 bg-gray-100 rounded-full overflow-hidden my-2'>
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${cfg.bar}`}
                                            style={{ width: `${perf.accuracy}%` }}
                                        />
                                    </div>
                                    <p className='text-sm text-gray-500'>{perf.totalQuestions} questions completed</p>
                                </div>
                            )}

                            <div className='mt-5'>
                                <h3 className='uppercase text-xs font-bold text-slate-400 tracking-widest mb-2'>Key topics</h3>
                                <ul className='flex items-center gap-2 flex-wrap'>
                                    {category.subcategories.map((sub, i) => (
                                        <li key={i} className='bg-blue-50 border border-blue-100 text-blue-500 py-0.5 px-2 rounded-full text-xs'>
                                            {sub}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='mt-5 flex gap-4'>
                                <Link href={{
                                    pathname: `/dashboard/nclex/new-session`,
                                    query: { category: category.name.toLowerCase() }
                                }} className='w-full'>
                                    <Button size='lg' className='w-full'><PlayIcon /> Start session</Button>
                                </Link>
                                <Button size='lg' variant='secondary' className='w-44 max-sm:w-fit'><BookA /> Study Guide</Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};